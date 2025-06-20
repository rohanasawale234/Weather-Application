
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading = false }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-2xl leading-5 bg-white bg-opacity-20 backdrop-blur-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent transition-all duration-300"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !city.trim()}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <div className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-2 transition-all duration-200 disabled:opacity-50">
            <Search className="h-4 w-4 text-white" />
          </div>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
