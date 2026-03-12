// /hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/api.auth";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (emailorusername, password) => {
    if (!emailorusername || !password) {
      throw new Error("Please fill in all the fields");
    }
    try {
      setLoading(true);
      const response = await loginUser(emailorusername, password);
      console.log(response);
      setUser(response.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleRegister = async (username, email, password) => {
    if (!username || !email || !password) {
      throw new Error("Please fill in all the fields");
    }
    try {
      setLoading(true);
      const response = await registerUser(username, email, password);
      setUser(response.user);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await logoutUser();
      setUser(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleGetMe = async () => {
    try {
      setLoading(true);
      const response = await getMe();
      setUser(response.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {
    user,
    setUser,
    loading,
    setLoading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGetMe,
  };
};
