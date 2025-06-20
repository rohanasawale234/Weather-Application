
import React, { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings as SettingsIcon, User, Thermometer, Palette, MapPin, LogOut } from 'lucide-react';

const Settings = () => {
  const { profile, updateProfile } = useProfile();
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [defaultCity, setDefaultCity] = useState(profile?.default_city || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveProfile = async () => {
    await updateProfile({
      full_name: fullName,
      default_city: defaultCity,
    });
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    if (profile) {
      updateProfile({ theme: newTheme });
    }
  };

  const handleTemperatureUnitChange = (unit: 'celsius' | 'fahrenheit') => {
    if (profile) {
      updateProfile({ temperature_unit: unit });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Customize your weather app experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultCity">Default City</Label>
                <Input
                  id="defaultCity"
                  value={defaultCity}
                  onChange={(e) => setDefaultCity(e.target.value)}
                  placeholder="e.g., New York, London"
                />
              </div>
              
              <Button onClick={handleSaveProfile} className="w-full">
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Temperature Unit Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Units
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Temperature Unit</Label>
                <Select 
                  value={profile?.temperature_unit || 'celsius'} 
                  onValueChange={handleTemperatureUnitChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celsius">Celsius (°C)</SelectItem>
                    <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sign Out */}
          <Button 
            variant="destructive" 
            onClick={signOut}
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
