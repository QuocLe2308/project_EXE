import React, { useEffect, useState, createContext, ReactNode } from "react";
import {jwtDecode} from "jwt-decode";

interface User {
  username: string;
  userID: string;
  role: string;
  auth: boolean;
}

interface UserContextType {
  user: User;
  loginContext: (username: string, token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    userID: "",
    username: "",
    role: "",
    auth: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setUser({
        userID: decoded.userID,
        username: decoded.username,
        role: decoded.role,
        auth: true,
      });
    }
  }, []);

  const loginContext = (username: string, token: string) => {
    const decoded: any = jwtDecode(token);
    setUser({
      userID: decoded.userID,
      username: decoded.username,
      role: decoded.role,
      auth: true,
    });
    console.log("Saving token to localStorage:", token);

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", decoded.role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUser({
      userID: "",
      username: "",
      role: "",
      auth: false,
    });
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };