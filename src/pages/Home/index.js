import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
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
import { getlistmovies } from '../../utils/movie';

export default function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    let isActive = true;

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

      const nowList = getlistmovies(5, nowData.data.results);
      const popularList = getlistmovies(5, popularData.data.results);
      const topList = getlistmovies(5, topData.data.results);

      setNowMovies(nowList);
      setPopularMovies(popularList);
      setTopMovies(topList);

    }

    getMovies();
  }, []);

  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input placeholder="Ex Vingadores" placeholderTextColor="#DDD" />
        <SearchBtn>
          <Feather name="search" size={30} color="#FFF" />
        </SearchBtn>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em Cartaz</Title>
        <BannerBtn activeOpacity={0.9} onPress={() => alert("teste")}>
          <Banner
            resizeMethod="resize"
            source={{
              uri: "https://images.unsplash.com/photo-1624817670169-57a1245cf3f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=765&q=80",
            }}
          />
        </BannerBtn>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={ (item) => String(item.id) }
        />

        <Title>Populares</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={ (item) => String(item.id) }
        />

        <Title>Mais Votados</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={ (item) => String(item.id) }
        />
      </ScrollView>
    </Container>
  );
}
