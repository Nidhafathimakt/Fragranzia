import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (accessToken && user) {
      setAuth({
        accessToken,
        role: user.role,
        image: user.image,
        name: user.name,
        user,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
