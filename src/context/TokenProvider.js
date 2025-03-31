import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    console.log("TokenProvider mounted");
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
  };

  return (
    <TokenContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
