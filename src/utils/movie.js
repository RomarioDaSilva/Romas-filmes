

// Gerar lista de fimes com tamanho desejado.
export function getlistmovies(size, movies){
    let popularMovies = [];

    for(let i = 0, l = size; i < l; i++){
        popularMovies.push(movies[i])
    }

    return popularMovies;
}