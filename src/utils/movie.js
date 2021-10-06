// Gerar lista de fimes com tamanho desejado.
export function getlistmovies(size, movies) {
  let popularMovies = [];

  for (let i = 0, l = size; i < l; i++) {
    popularMovies.push(movies[i]);
  }

  return popularMovies;
}

// gerar numero aleatorio com base no tamanho de filmes

export function randomBanner(movies) {
  return Math.floor(Math.random() * movies.length);
}
