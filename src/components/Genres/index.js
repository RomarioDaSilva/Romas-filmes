import React from "react";

import { Container, Name } from "./styled";

export default function Genres({ data }) {
  return (
    <Container>
      <Name>{data.name}</Name>
    </Container>
  );
}
