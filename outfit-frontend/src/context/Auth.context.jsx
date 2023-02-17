import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const sign_in = (email, password) => {
    console.log('sign in');
  };

  const sign_up = async ({ photo, email, password, confirmPassword, name }) => {
    if (password !== confirmPassword) {
      alert('Password and confirm password do not match');
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all the fields');
      return;
    }

    const { data } = await axios.post('/auth/sign_up', {
      email,
      password,
      confirmPassword,
      name,
      role: 'user',
      photo,
    });

    console.log(data);
  };

  const value = {
    user,
    sign_in,
    sign_up,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
