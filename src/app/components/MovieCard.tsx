import { StarIcon, PlayIcon } from '@heroicons/react/24/solid';

interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  year: number;
  genres: string[];
  description: string;
}

interface MovieCardProps {
  movie: Movie;
  onGetRecommendations: (movieId: number) => void;
}

export default function MovieCard({ movie, onGetRecommendations }: MovieCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative group">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <PlayIcon className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 truncate">{movie.title}</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">{movie.year}</span>
          <div className="flex items-center space-x-1">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold">{movie.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genres.slice(0, 2).map(genre => (
            <span
              key={genre}
              className="px-2 py-1 bg-purple-600 text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {movie.description}
        </p>
        
        <button
          onClick={() => onGetRecommendations(movie.id)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Get Recommendations
        </button>
      </div>
    </div>
  );
}
