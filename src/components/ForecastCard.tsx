
import React from 'react';
import { Cloud, CloudRain, Sun, Snowflake } from 'lucide-react';

interface ForecastData {
  date: string;
  condition: string;
  maxTemp: number;
  minTemp: number;
  icon: string;
}

interface ForecastCardProps {
  forecast: ForecastData[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="w-8 h-8 text-blue-400" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="w-8 h-8 text-gray-600" />;
    } else if (conditionLower.includes('snow')) {
      return <Snowflake className="w-8 h-8 text-blue-300" />;
    } else {
      return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white bg-opacity-10 rounded-xl hover:bg-opacity-20 transition-all duration-200">
            <div className="flex items-center space-x-4">
              {getWeatherIcon(day.condition)}
              <div>
                <p className="text-white font-semibold">{formatDate(day.date)}</p>
                <p className="text-white text-sm opacity-80">{day.condition}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">{Math.round(day.maxTemp)}°</p>
              <p className="text-white text-sm opacity-80">{Math.round(day.minTemp)}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
