import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = {
    user,
  };

  const sign_in = (email, password) => {};
  const sign_up = ({ email, password, confirmPassword, name, details }) => {};
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
