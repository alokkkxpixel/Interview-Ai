import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedWrapper = ({ children }) => {
  const { handleGetMe, setUser, user } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsInitializing(false);
        navigate('/auth/login', { replace: true });
        return;
      }

      // If user is already loaded, skip fetching
      if (user) {
        setIsInitializing(false);
        return;
      }

      try {
        const response = await handleGetMe();
        setUser(response.user);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/auth/login', { replace: true });
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
    // Intentionally omitting navigate/setUser to prevent endless re-renders
    // Run this effect once on mount, or when token/user somehow unexpectedly clears.
  }, []); // Empty dependencies ensures this runs ONCE.

  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-muted-foreground">
        Loading...
      </div>
    );
  }

  // Prevent seeing the layout when explicitly on auth pages
  if (user && location.pathname.startsWith('/auth/')) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  if (!user && !location.pathname.startsWith('/auth/')) {
     navigate('/auth/login', { replace: true });
     return null;
  }

  return <>{children}</>;
};

export default ProtectedWrapper;