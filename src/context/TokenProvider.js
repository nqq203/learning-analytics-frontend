import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    
    setIsLoading(true); 
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }
    // setAccessToken("124352545");
    setIsLoading(false); 
    
    // setRefreshToken("RTRTRTRT")
    
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
  };

  return (
    <TokenContext.Provider value={{ accessToken, refreshToken,isLoading, login, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
