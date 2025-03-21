const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

interface IMovie {
  id: number;
  overview: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
}

export interface IGetMovies {
  dates: {
    maximums: string;
    minimums: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const getMovies = () => {
  return fetch("https://api.themoviedb.org/3/movie/now_playing", options).then(
    (response) => response.json()
  );
};

export const getImages = (path: string, width?: string) => {
  return `https://image.tmdb.org/t/p/${width ? width : "original"}${path}`;
};
