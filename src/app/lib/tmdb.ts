// tmdb.ts

const API_KEY = 'd442280cc8451fcdedf5e967216cf22d';
const BASE_URL = 'https://api.themoviedb.org/3';

let genreMap: Record<number, string> = {};

async function getGenreMap() {
  if (Object.keys(genreMap).length > 0) return genreMap;

  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();
  genreMap = {};
  for (const genre of data.genres) {
    genreMap[genre.id] = genre.name;
  }
  return genreMap;
}

export async function getMovieData(title: string) {
  const query = encodeURIComponent(title);
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch TMDB data for ${title}`);
  }

  const data = await res.json();
  const movie = data.results?.[0];
  const genres = await getGenreMap();

  if (!movie) {
    return {
      id: null,
      title,
      poster: null,
      rating: 0,
      year: 'N/A',
      genres: [],
      description: 'No description available.',
    };
  }

  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    rating: movie.vote_average,
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
    genres: movie.genre_ids.map(id => genres[id] || 'Unknown'),
    description: movie.overview,
  };
}

const movieTitles = [
  'Inception',
  'Interstellar',
  'The Matrix',
  'The Dark Knight',
  'Fight Club',
  'Parasite',
  'The Godfather',
  'Titanic',
  'Pulp Fiction',
  'Avatar',
];

export async function getAllMovies() {
  const promises = movieTitles.map(title => getMovieData(title));
  const movies = await Promise.all(promises);
  return movies.filter(m => m.id !== null); // remove not found ones
}
