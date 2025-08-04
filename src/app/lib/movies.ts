import { getMovieData } from './tmdb';

const movieTitles = [
  "Inception",
  "Interstellar",
  "The Matrix",
  "The Dark Knight",
  "Fight Club",
  "Parasite"
];

export async function getAllMovies() {
  const promises = movieTitles.map(title => getMovieData(title));
  const movies = await Promise.all(promises);
  return movies;
}
