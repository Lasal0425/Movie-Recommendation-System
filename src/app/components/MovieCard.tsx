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
  onGetRecommendations: () => void;
}

export default function MovieCard({ movie, onGetRecommendations }: MovieCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <svg className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded-lg">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-sm font-semibold text-white">{movie.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 truncate" title={movie.title}>
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-sm">{movie.year}</span>
          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map(genre => (
              <span
                key={genre}
                className="px-2 py-1 bg-purple-500 text-xs rounded-full"
              >
                {genre}
              </span>
            ))}
            {movie.genres.length > 2 && (
              <span className="px-2 py-1 bg-gray-600 text-xs rounded-full">
                +{movie.genres.length - 2}
              </span>
            )}
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2" title={movie.description}>
          {movie.description}
        </p>
        
        <div className="space-y-2">
          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Add to Watchlist</span>
          </button>
          <button
            onClick={onGetRecommendations}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Get AI Recommendations</span>
          </button>
        </div>
      </div>
    </div>
  );
}