import React from 'react';
import { BackBtn, Name } from './styled';
import  { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

export default function ModalLink({ link, title, closeModal }) {
 return (
   <>
     <BackBtn onPress={closeModal}>
       <Feather name="x" size={35} color="#FFF" />
       <Name numberOflines={1}>{title}</Name>
     </BackBtn>

     <WebView
      source={{ uri: link }}
     />
   </>
  );
}