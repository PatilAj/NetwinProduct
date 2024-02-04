import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/auth',
  timeout: 10000,
});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();


  useEffect(() => {
    const checkLoggedIn = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get('/me', { headers: { 'Authorization': `Bearer ${token}` }});
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    checkLoggedIn();
  }, [token]);
  const loginAction = async (data) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.id) {
        setUser(res.username);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/");
        return;
      }else{
        setLoginError(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, loginError,user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};