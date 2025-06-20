
import React from 'react';
import { Cloud, CloudRain, Sun, Snowflake, Wind, Thermometer } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="w-16 h-16 text-blue-400" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="w-16 h-16 text-gray-400" />;
    } else if (conditionLower.includes('snow')) {
      return <Snowflake className="w-16 h-16 text-blue-200" />;
    } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return <Sun className="w-16 h-16 text-yellow-400" />;
    } else {
      return <Sun className="w-16 h-16 text-yellow-400" />;
    }
  };

  const getBackgroundGradient = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain')) {
      return 'from-blue-400 via-blue-500 to-blue-600';
    } else if (conditionLower.includes('cloud')) {
      return 'from-gray-400 via-gray-500 to-gray-600';
    } else if (conditionLower.includes('snow')) {
      return 'from-blue-200 via-blue-300 to-blue-400';
    } else {
      return 'from-yellow-400 via-orange-400 to-orange-500';
    }
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${getBackgroundGradient(weather.condition)} rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300`}>
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">{weather.location}</h2>
            <p className="text-lg opacity-90">{weather.condition}</p>
          </div>
          {getWeatherIcon(weather.condition)}
        </div>
        
        <div className="text-6xl font-bold mb-6">
          {Math.round(weather.temperature)}°C
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-5 h-5" />
            <span>Humidity: {weather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="w-5 h-5" />
            <span>Wind: {weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
