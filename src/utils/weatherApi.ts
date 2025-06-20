
// Mock weather API - Replace with real API like OpenWeatherMap
export interface WeatherResponse {
  location: string;
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
  forecast: Array<{
    day: string;
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }>;
  hourly: Array<{
    time: string;
    temperature: number;
    condition: string;
    icon: string;
  }>;
}

const conditions = ['Clear', 'Cloudy', 'Rainy', 'Sunny', 'Partly Cloudy'];
const icons = ['☀️', '⛅', '🌧️', '🌤️', '☁️'];

const mockWeatherData = (city: string): WeatherResponse => {
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];
  
  const generateForecast = () => {
    const forecast = [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      
      forecast.push({
        day: days[i],
        date: date.toLocaleDateString(),
        high: Math.floor(Math.random() * 15) + 20,
        low: Math.floor(Math.random() * 10) + 10,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        icon: icons[Math.floor(Math.random() * icons.length)]
      });
    }
    return forecast;
  };

  const generateHourlyForecast = () => {
    const hourly = [];
    const currentHour = new Date().getHours();
    
    for (let i = 0; i < 24; i++) {
      const hour = (currentHour + i) % 24;
      const time = `${hour.toString().padStart(2, '0')}:00`;
      
      hourly.push({
        time,
        temperature: Math.floor(Math.random() * 20) + 10,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        icon: icons[Math.floor(Math.random() * icons.length)]
      });
    }
    return hourly;
  };

  return {
    location: city,
    current: {
      temperature: Math.floor(Math.random() * 20) + 15,
      condition: randomCondition,
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      icon: randomIcon
    },
    forecast: generateForecast(),
    hourly: generateHourlyForecast()
  };
};

export const fetchWeatherData = async (city: string): Promise<WeatherResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data - replace this with real API call
  return mockWeatherData(city);
};

// Example of how to integrate with a real API:
/*
export const fetchWeatherData = async (city: string): Promise<WeatherResponse> => {
  const API_KEY = 'your-openweathermap-api-key';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Weather data not found');
  }
  
  const data = await response.json();
  
  return {
    location: data.city.name,
    current: {
      temperature: data.list[0].main.temp,
      condition: data.list[0].weather[0].main,
      humidity: data.list[0].main.humidity,
      windSpeed: data.list[0].wind.speed,
      icon: data.list[0].weather[0].icon
    },
    forecast: data.list.slice(1, 6).map((item: any, index: number) => {
      const date = new Date();
      date.setDate(date.getDate() + index + 1);
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      
      return {
        day: days[index],
        date: date.toLocaleDateString(),
        high: item.main.temp_max,
        low: item.main.temp_min,
        condition: item.weather[0].main,
        icon: item.weather[0].icon
      };
    }),
    hourly: data.list.slice(0, 24).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      temperature: item.main.temp,
      condition: item.weather[0].main,
      icon: item.weather[0].icon
    }))
  };
};
*/
