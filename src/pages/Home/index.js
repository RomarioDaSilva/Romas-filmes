import React from 'react';
import { ScrollView } from 'react-native';
import { Container, SearchContainer, Input, SearchBtn, Title, BannerBtn, Banner, SliderMovie } from './styles';

import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';
import { Feather } from '@expo/vector-icons';
export default function Home() {
 return (
   <Container>
     <Header title="React Prime"/>

     <SearchContainer>
       <Input
        placeholder="Ex Vingadores"
        placeholderTextColor="#DDD"
       />
     <SearchBtn>
      <Feather name="search" size={30} color="#FFF"/>
     </SearchBtn>
     </SearchContainer>

     <ScrollView showsVerticalScrollIndicator={false}>
       <Title>Em Cartaz</Title>
       <BannerBtn activeOpacity={0.9} onPress={ () => alert('teste')}>
         <Banner
          resizeMethod="resize"
          source={{ uri: 'https://images.unsplash.com/photo-1624817670169-57a1245cf3f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=765&q=80'}}
         />
       </BannerBtn>

       <SliderMovie
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={[1,2,3,4]}
        renderItem={ ({item}) => <SliderItem/>}
       />

       <Title>Populares</Title>
       <SliderMovie
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={[1,2,3,4]}
        renderItem={ ({item}) => <SliderItem/>}
       />

       <Title>Mais Votados</Title>
       <SliderMovie
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={[1,2,3,4]}
        renderItem={ ({item}) => <SliderItem/>}
       />

     </ScrollView>

   </Container>
  );
}