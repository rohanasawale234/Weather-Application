
import React from 'react';
import { Clock } from 'lucide-react';

interface HourlyData {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
}

interface HourlyForecastProps {
  hourlyData: HourlyData[];
  temperatureUnit?: 'celsius' | 'fahrenheit';
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData, temperatureUnit = 'celsius' }) => {
  const convertTemperature = (temp: number) => {
    if (temperatureUnit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const getTemperatureUnit = () => {
    return temperatureUnit === 'fahrenheit' ? '°F' : '°C';
  };

  // Show only next 12 hours for better display
  const displayHours = hourlyData.slice(0, 12);

  return (
    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-white/20 dark:border-gray-700/20 shadow-xl">
      <div className="flex items-center mb-6">
        <Clock className="h-6 w-6 text-white mr-3" />
        <h3 className="text-xl md:text-2xl font-bold text-white">Hourly Forecast</h3>
      </div>
      
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {displayHours.map((hour, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white/10 dark:bg-black/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-200 min-w-[100px] text-center"
            >
              <div className="text-white/80 text-sm font-medium mb-2">{hour.time}</div>
              <div className="text-2xl mb-2">{hour.icon}</div>
              <div className="text-white font-bold text-lg">
                {convertTemperature(hour.temperature)}{getTemperatureUnit()}
              </div>
              <div className="text-white/70 text-xs mt-1 truncate">{hour.condition}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
