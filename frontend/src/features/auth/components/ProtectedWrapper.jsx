import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

const ProtectedWrapper = ({ children }) => {
 const {handleGetMe,loading,setUser,user,setLoading} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/auth/login');
      return;
    }

    const fetchUser = async () => {
      try {
      const response = await handleGetMe();
      
        setUser(response.user);
        
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, navigate, setUser]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (user && location.pathname === '/auth/login') {
    navigate('/home');
  }

  return <>{children}</>;
};

export default ProtectedWrapper;