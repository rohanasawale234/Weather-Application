
import React from 'react';
import { Cloud, Droplets, Wind, Heart, HeartOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useFavoriteCities } from '@/hooks/useFavoriteCities';

interface WeatherCardProps {
  weather: {
    location: string;
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
  temperatureUnit?: 'celsius' | 'fahrenheit';
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, temperatureUnit = 'celsius' }) => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { favoriteCities, addFavoriteCity, removeFavoriteCity } = useFavoriteCities();

  const convertTemperature = (temp: number) => {
    if (temperatureUnit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const getTemperatureUnit = () => {
    return temperatureUnit === 'fahrenheit' ? '°F' : '°C';
  };

  const isFavorite = favoriteCities.some(city => city.city_name.toLowerCase() === weather.location.toLowerCase());
  const isDefault = profile?.default_city?.toLowerCase() === weather.location.toLowerCase();

  const handleToggleFavorite = () => {
    if (!user) return;

    if (isFavorite) {
      const cityToRemove = favoriteCities.find(city => city.city_name.toLowerCase() === weather.location.toLowerCase());
      if (cityToRemove) {
        removeFavoriteCity(cityToRemove.id);
      }
    } else {
      addFavoriteCity(weather.location);
    }
  };

  const handleSetAsDefault = () => {
    if (!user || !profile) return;
    updateProfile({ default_city: weather.location });
  };

  return (
    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 dark:border-gray-700/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{weather.location}</h2>
          {user && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleFavorite}
                className="text-white hover:bg-white/20 p-1"
              >
                {isFavorite ? <Heart className="h-5 w-5 fill-current" /> : <HeartOff className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </div>
        <p className="text-white/80 text-sm md:text-base">{weather.condition}</p>
        {isDefault && (
          <p className="text-white/60 text-xs mt-1">Default City</p>
        )}
        {user && !isDefault && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSetAsDefault}
            className="text-white/80 hover:bg-white/20 text-xs mt-1"
          >
            Set as Default
          </Button>
        )}
      </div>
      
      <div className="flex items-center justify-center mb-8">
        <div className="text-6xl md:text-7xl lg:text-8xl mr-4">{weather.icon}</div>
        <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
          {convertTemperature(weather.temperature)}
          <span className="text-3xl md:text-4xl lg:text-5xl">{getTemperatureUnit()}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white/10 dark:bg-black/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-2">
            <Droplets className="h-6 w-6 text-blue-300 mr-2" />
            <span className="text-white/80 text-sm md:text-base">Humidity</span>
          </div>
          <div className="text-center text-xl md:text-2xl font-semibold text-white">{weather.humidity}%</div>
        </div>
        
        <div className="bg-white/10 dark:bg-black/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-2">
            <Wind className="h-6 w-6 text-green-300 mr-2" />
            <span className="text-white/80 text-sm md:text-base">Wind</span>
          </div>
          <div className="text-center text-xl md:text-2xl font-semibold text-white">{weather.windSpeed} km/h</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
