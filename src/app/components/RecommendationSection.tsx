import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  year: number;
  genres: string[];
  description: string;
}

interface RecommendationSectionProps {
  recommendations: Movie[];
  loading: boolean;
  onGetRecommendations: (movieId: number) => void;
}

export default function RecommendationSection({ 
  recommendations, 
  loading, 
  onGetRecommendations 
}: RecommendationSectionProps) {
  if (loading) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Getting Recommendations...</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
              <div className="w-full h-64 bg-gray-700"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded mb-4 w-3/4"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-center">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI Recommendations for You
        </span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommendations.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onGetRecommendations={onGetRecommendations}
          />
        ))}
      </div>
    </div>
  );
}
