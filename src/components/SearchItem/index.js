import React from 'react';
import { Container, Banner, Title, RateContainer, Rate } from './styles';
import { Ionicons } from '@expo/vector-icons';

export default function SearchItem({ data, navigatePage }) {

  function detailmovie(){
    if(data.release_data === ''){
      alert('Filme ainda sem data de lançamento!')
      return;
    }

    navigatePage(data);
  }

 return (
   <Container activeOpacity={0.7} onPress={detailmovie} >
       { data?.poster_path ? (
         <Banner 
          resizeMethod="resize"
          source={{ uri: `https://image.tmdb.org/t/p/original/${data?.poster_path}`, }}
         />
       ) : (
        <Banner 
        resizeMethod="resize"
        source={ require('../../assets/semfoto.png')}
       />
       )}

       <Title>{data?.title}</Title>

        <RateContainer>
          <Ionicons name="md-star" size={12} color="#E7A74e" />
          <Rate>{data?.vote_average}</Rate>
        </RateContainer>
   </Container>
  );
}