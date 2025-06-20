
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface FavoriteCity {
  id: string;
  city_name: string;
  country: string | null;
}

export const useFavoriteCities = () => {
  const [favoriteCities, setFavoriteCities] = useState<FavoriteCity[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchFavoriteCities();
    }
  }, [user]);

  const fetchFavoriteCities = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('favorite_cities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching favorite cities:', error);
        return;
      }

      setFavoriteCities(data || []);
    } catch (error) {
      console.error('Error fetching favorite cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavoriteCity = async (cityName: string, country?: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('favorite_cities')
        .insert({
          user_id: user.id,
          city_name: cityName,
          country: country || null,
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "City already in favorites",
            description: `${cityName} is already in your favorite cities.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to add city to favorites",
            variant: "destructive",
          });
        }
        return false;
      }

      await fetchFavoriteCities();
      toast({
        title: "Success",
        description: `${cityName} added to favorites`,
      });
      return true;
    } catch (error) {
      console.error('Error adding favorite city:', error);
      toast({
        title: "Error",
        description: "Failed to add city to favorites",
        variant: "destructive",
      });
      return false;
    }
  };

  const removeFavoriteCity = async (cityId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('favorite_cities')
        .delete()
        .eq('id', cityId)
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove city from favorites",
          variant: "destructive",
        });
        return;
      }

      await fetchFavoriteCities();
      toast({
        title: "Success",
        description: "City removed from favorites",
      });
    } catch (error) {
      console.error('Error removing favorite city:', error);
      toast({
        title: "Error",
        description: "Failed to remove city from favorites",
        variant: "destructive",
      });
    }
  };

  return {
    favoriteCities,
    loading,
    addFavoriteCity,
    removeFavoriteCity,
    refreshFavoriteCities: fetchFavoriteCities,
  };
};
