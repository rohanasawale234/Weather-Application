
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import Settings from './Settings';
import { Cloud, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  return (
    <header className="w-full bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="h-6 w-6 text-white" />
          <h1 className="text-xl font-bold text-white">Weather App</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 text-white/80">
                <User className="h-4 w-4" />
                <span className="text-sm">
                  {profile?.full_name || user.email}
                </span>
              </div>
              <Settings />
            </>
          ) : (
            <Link to="/auth">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
