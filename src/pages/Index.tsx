
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import WeatherCard from '@/components/WeatherCard';
import SearchBar from '@/components/SearchBar';
import ForecastCard from '@/components/ForecastCard';
import Header from '@/components/Header';
import { fetchWeatherData, WeatherResponse } from '@/utils/weatherApi';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { profile } = useProfile();
  const { toast } = useToast();

  // Load default weather data on component mount
  useEffect(() => {
    const defaultCity = profile?.default_city || 'New York';
    handleSearch(defaultCity);
  }, [profile]);

  const handleSearch = async (city: string) => {
    setLoading(true);
    try {
      console.log(`Searching weather for: ${city}`);
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      console.log('Weather data received:', data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
              {user && profile?.full_name 
                ? `Welcome back, ${profile.full_name.split(' ')[0]}!`
                : 'Weather App'
              }
            </h1>
            <p className="text-lg md:text-xl text-white opacity-90 animate-fade-in animation-delay-200">
              Get real-time weather information for any city worldwide
            </p>
          </div>

          <SearchBar onSearch={handleSearch} loading={loading} />

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}

          {weatherData && !loading && (
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto animate-fade-in">
              <div className="w-full">
                <WeatherCard
                  weather={{
                    location: weatherData.location,
                    temperature: weatherData.current.temperature,
                    condition: weatherData.current.condition,
                    humidity: weatherData.current.humidity,
                    windSpeed: weatherData.current.windSpeed,
                    icon: weatherData.current.icon,
                  }}
                  temperatureUnit={profile?.temperature_unit || 'celsius'}
                />
              </div>
              <div className="w-full">
                <ForecastCard 
                  forecast={weatherData.forecast} 
                  temperatureUnit={profile?.temperature_unit || 'celsius'}
                />
              </div>
            </div>
          )}

          {!weatherData && !loading && (
            <div className="text-center py-12">
              <p className="text-white text-lg md:text-xl opacity-80">
                {profile?.default_city 
                  ? `Loading weather for ${profile.default_city}...`
                  : 'Search for a city to see its weather information'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
