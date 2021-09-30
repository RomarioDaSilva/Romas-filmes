import React, { useState, useEffect} from 'react';
import { Container, Header, HeaderBtn, Banner  } from './styles';

import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api, { key } from '../../services/api';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';


export default function Detail() {

  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});

  useEffect(() => {
    let isActive = true;

    async function getMovie(){
      const response = await api.get(`/movie/${route.params?.id}`, {
        params: {
          api_key: key,
          languege: 'pt-BR'
        }
      })
      .catch((err) => {
        console.log(err)
      })

      if(isActive){
        setMovie(response.data);
        console.log(response.data);
      }
    }

    if(isActive){
      getMovie();
    }

    return() => {
      isActive = false;
    }

  }, [])

 return (
   <Container>
       <Header>
         <HeaderBtn>
            <Feather
              name="arrow-left"
              size={28}
              color="#FFF"
            />
         </HeaderBtn>
         <HeaderBtn>
            <Ionicons
              name="bookmark"
              size={28}
              color="#FFF"
            />
         </HeaderBtn>
       </Header>
   </Container>
  );
}