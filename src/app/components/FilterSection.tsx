interface FilterSectionProps {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  selectedRating: string;
  setSelectedRating: (rating: string) => void;
}

export default function FilterSection({ 
  selectedGenres, 
  setSelectedGenres, 
  selectedRating, 
  setSelectedRating 
}: FilterSectionProps) {
  const genres = [
    'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 
    'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Fantasy'
  ];
  
  const ratings = [
    { label: 'All Ratings', value: '' },
    { label: '9.0+ (Masterpiece)', value: '9.0' },
    { label: '8.0+ (Excellent)', value: '8.0' },
    { label: '7.0+ (Good)', value: '7.0' },
    { label: '6.0+ (Decent)', value: '6.0' }
  ];

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(
      selectedGenres.includes(genre) 
        ? selectedGenres.filter(g => g !== genre)
        : [...selectedGenres, genre]
    );
  };

  const clearAllFilters = () => {
    setSelectedGenres([]);
    setSelectedRating('');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Filters</h3>
        {(selectedGenres.length > 0 || selectedRating) && (
          <button
            onClick={clearAllFilters}
            className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      {/* Genres */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">Genres</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {genres.map(genre => (
            <label key={genre} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded transition-colors">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreToggle(genre)}
                className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <span className="text-gray-300">{genre}</span>
            </label>
          ))}
        </div>
        {selectedGenres.length > 0 && (
          <div className="mt-3 text-sm text-gray-400">
            {selectedGenres.length} genre{selectedGenres.length > 1 ? 's' : ''} selected
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">Minimum Rating</h4>
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
        >
          {ratings.map(rating => (
            <option key={rating.value} value={rating.value}>
              {rating.label}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold">Quick Filters</h4>
        <div className="space-y-2">
          <button
            onClick={() => {
              setSelectedGenres(['Action', 'Sci-Fi']);
              setSelectedRating('8.0');
            }}
            className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          >
            🚀 Sci-Fi Action
          </button>
          <button
            onClick={() => {
              setSelectedGenres(['Crime', 'Drama']);
              setSelectedRating('8.5');
            }}
            className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          >
            🎭 Crime Dramas
          </button>
          <button
            onClick={() => {
              setSelectedGenres(['Comedy']);
              setSelectedRating('7.0');
            }}
            className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          >
            😄 Feel Good Movies
          </button>
        </div>
      </div>
    </div>
  );
}
