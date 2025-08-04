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
  onGetRecommendations: () => void;
}

export default function RecommendationSection({ 
  recommendations = [], 
  loading, 
  onGetRecommendations 
}: RecommendationSectionProps) {
  if (loading) {
    return (
      <div className="mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
            <span className="text-lg font-semibold">AI is analyzing your preferences...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
              <div className="w-full h-64 bg-gray-700"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded mb-4 w-3/4"></div>
                <div className="h-8 bg-gray-700 rounded mb-2"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
            AI Recommendations for You
          </span>
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Based on your preferences and viewing patterns, our AI recommends these movies you might love
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommendations.map((movie, index) => (
          <div key={movie.id} className="relative">
            <div className="absolute -top-3 -left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center z-10">
              {index + 1}
            </div>
            <MovieCard 
              movie={movie} 
              onGetRecommendations={onGetRecommendations}
            />
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button
          onClick={onGetRecommendations}
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 inline-flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Get More Recommendations</span>
        </button>
      </div>
    </div>
  );
}