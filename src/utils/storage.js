import AsyncStorage from "@react-native-async-storage/async-storage";

// Buscar os filmes salvos

export async function getMoviesSave(key) {
  const myMovies = await AsyncStorage.getItem(key);

  let moviesSave = JSON.parse(myMovies) || [];

  return moviesSave;
}

// Salvar um novo filme
export async function saveMovie(key, newMovie) {
  let moviesStored = await getMoviesSave(key);

  const hasMovie = moviesStored.some((item) => item.id === newMovie.id);

  if (hasMovie) {
    console.log("esse filme ja existe na lista");
    return;
  }

  moviesStored.push(newMovie);

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
  console.log("FILME SALVO COM SUCESSO!");
}

// Deletar umfilme

export async function deleteMovie(id) {
  let moviesStored = await getMoviesSave("@romasfilme");

  let myMovies = moviesStored.filter((item) => {
    return item.id !== id;
  });

  await AsyncStorage.setItem("@romasfilme", JSON.stringify(myMovies));
  console.log("FILME DELETADO!");
  return myMovies;
}

// Filtrar algum filme salvo

export async function hasMovie(movie) {
  let moviesStored = await getMoviesSave("@romasfilme");

  const hasMovie = moviesStored.find((item) => item.id === movie.id);

  if (hasMovie) {
    return true;
  }

  return false;
}
