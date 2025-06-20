
import React from 'react';
import { Calendar } from 'lucide-react';

interface ForecastDay {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

interface ForecastCardProps {
  forecast: ForecastDay[];
  temperatureUnit?: 'celsius' | 'fahrenheit';
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, temperatureUnit = 'celsius' }) => {
  const convertTemperature = (temp: number) => {
    if (temperatureUnit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const getTemperatureUnit = () => {
    return temperatureUnit === 'fahrenheit' ? '°F' : '°C';
  };

  return (
    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-white mr-3" />
        <h3 className="text-xl md:text-2xl font-bold text-white">5-Day Forecast</h3>
      </div>
      
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-white/10 dark:bg-black/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="text-2xl md:text-3xl mr-3 md:mr-4">{day.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm md:text-base truncate">{day.day}</div>
                  <div className="text-white/70 text-xs md:text-sm">{day.date}</div>
                  <div className="text-white/80 text-xs md:text-sm truncate">{day.condition}</div>
                </div>
              </div>
              <div className="text-right ml-2">
                <div className="text-white font-bold text-lg md:text-xl">
                  {convertTemperature(day.high)}{getTemperatureUnit()}
                </div>
                <div className="text-white/60 text-sm md:text-base">
                  {convertTemperature(day.low)}{getTemperatureUnit()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
