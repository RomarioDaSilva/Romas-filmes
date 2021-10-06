import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";

import {
  Container,
  Title,
  RateContainer,
  Rate,
  ActionContainer,
  DetailBtn,
  DeleteBtn,
} from "./styles";

export default function FavoriteItem({ data, deleteMovie, navigatePage }) {
  return (
    <Container>
      <Title size={22}>{data.title}</Title>

      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74e" />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>

      <ActionContainer>
        <DetailBtn onPress={() => navigatePage(data)}>
          <Title size={14}>Ver Detalhes</Title>
        </DetailBtn>

        <DeleteBtn onPress={() => deleteMovie(data.id)}>
          <Feather name="trash" size={24} color="#FFF" />
        </DeleteBtn>
        
      </ActionContainer>
    </Container>
  );
}
