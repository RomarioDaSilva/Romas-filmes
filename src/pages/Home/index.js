import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import {
  Container,
  SearchContainer,
  Input,
  SearchBtn,
  Title,
  BannerBtn,
  Banner,
  SliderMovie,
} from "./styles";

import Header from "../../components/Header";
import SliderItem from "../../components/SliderItem";
import { Feather } from "@expo/vector-icons";
import api, { key } from "../../services/api";
import { getlistmovies, randomBanner } from "../../utils/movie";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [bannerMovies, setBannerMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [input, setInput] = useState("");

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovies() {
      const [nowData, popularData, topData] = await Promise.all([
        api.get("/movie/now_playing", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/popular", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/top_rated", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
      ]);

      if (isActive) {
        const nowList = getlistmovies(5, nowData.data.results);
        const popularList = getlistmovies(5, popularData.data.results);
        const topList = getlistmovies(5, topData.data.results);

        setBannerMovies(
          nowData.data.results[randomBanner(nowData.data.results)]
        );

        setNowMovies(nowList);
        setPopularMovies(popularList);
        setTopMovies(topList);

        setLoading(false);
      }
    }

    getMovies();

    //desmontar component
    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  function navigateDetailsPage(item) {
    navigation.navigate("Detail", { id: item.id });
  }

  function handleSearcMovie() {
    if (input === "") return;

    navigation.navigate("Search", { name: input });
    setInput("");
  }

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#FFF" />
      </Container>
    );
  }
  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input
          placeholder="Ex Vingadores"
          placeholderTextColor="#DDD"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <SearchBtn onPress={handleSearcMovie}>
          <Feather name="search" size={30} color="#FFF" />
        </SearchBtn>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em Cartaz</Title>
        <BannerBtn
          activeOpacity={0.9}
          onPress={() => navigateDetailsPage(bannerMovies)}
        >
          <Banner
            resizeMethod="resize"
            source={{
              uri: `https://image.tmdb.org/t/p/original/${bannerMovies.poster_path}`,
            }}
          />
        </BannerBtn>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Populares</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais Votados</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
}
