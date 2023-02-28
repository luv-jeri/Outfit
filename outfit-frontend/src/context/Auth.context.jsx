import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './../wrappers/notification/Notification.wrapper';
import { useDispatch } from 'react-redux';
import { setCart } from '../store/cartSlice';
const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const { showNotification } = useNotification();
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('outfit-token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }
    return token;
  });

  const who_am_i = async () => {
    try {
      const { data } = await axios.get('auth/who_am_i');
      console.log(data);
      setUser(data.data);
      dispatch(setCart(data.data.cart));
    } catch (e) {
      console.log(e);
      //! check for all the error codes
      localStorage.removeItem('outfit-token');
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
      who_am_i();
    }
  }, [token]);

  const sign_in = async (email, password) => {
    try {
      const { data } = await axios.post('auth/sign_in', {
        email,
        password,
      });

      localStorage.setItem('outfit-token', data.token);
      setToken(data.token);
    } catch (e) {
      console.log(e);
      showNotification({
        title: 'Error',
        message: e.response.data.message,
        type: 'error',
      });
    }
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

    localStorage.setItem('outfit-token', data.token);
    setToken(data.token);
  };

  const sign_out = () => {
    localStorage.removeItem('outfit-token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    sign_in,
    sign_out,
    sign_up,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
