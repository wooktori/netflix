const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

export const getMovies = () => {
    return fetch(
        "https://api.themoviedb.org/3/movie/now_playing",
        options
    ).then((response) => response.json());
};
