import React, { useState } from 'react';
import s from './SignIn.module.css';
import { useAuth } from '../../../context/Auth.context';
import { useNotification } from '../../../wrappers/notification/Notification.wrapper';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const { sign_in } = useAuth();

  const { showNotification } = useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    if (!email && !password) {
      return showNotification({
        title: 'Please fill all the fields',
        message: 'Please fill all the fields',
        type: 'error',
      });
    }
    sign_in(email, password);
  };

  const handleNavigate = () => {
    navigate('/sign_up');
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        <h1>Sign In</h1>
        <form>
          <div className={s.input}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={s.input}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' onClick={handleClick}>
            Sign In
          </button>
          <h6 onClick={handleNavigate}>Not a user ?</h6>
          <h6
            onClick={() => {
              navigate('/send_otp');
            }}
          >
            Forgot Password ?
          </h6>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
