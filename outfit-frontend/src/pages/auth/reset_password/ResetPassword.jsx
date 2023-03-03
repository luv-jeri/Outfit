import React, { useState } from 'react';
import s from './ResetPassword.module.css';
import { useAuth } from '../../../context/Auth.context';
import { useNotification } from '../../../wrappers/notification/Notification.wrapper';
import { useNavigate, useLocation } from 'react-router-dom';

function ResetPassword() {
  const { reset_password } = useAuth();
  const location = useLocation();

  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [OTP, setOTP] = useState('');

  const { showNotification } = useNotification();

  const handleClick = (e) => {
    e.preventDefault();
    const { email } = location.state;
    if (!password && !confirmPassword && !OTP) {
      return showNotification({
        title: 'Please fill all the fields',
        message: 'Please fill all the fields',
        type: 'error',
      });
    }

    if (password !== confirmPassword) {
      return showNotification({
        title: 'Password does not match',
        message: 'Password does not match',
        type: 'error',
      });
    }

    reset_password(email, OTP, password);
  };

  const handleNavigate = () => {
    console.log('navigate');
    navigate('/sign_in');
  };
  return (
    <div className={s.container}>
      <div className={s.form}>
        <h1>Sign In</h1>
        <form>
          <div className={s.input}>
            <label htmlFor='otp'>OTP</label>
            <input
              type='number'
              name='otp'
              id='number'
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
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
          <div className={s.input}>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <input
              type='password'
              name='confrim-password'
              id='confirm-password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type='submit' onClick={handleClick}>
            Reset Password
          </button>
          <h6 onClick={handleNavigate}>Rember Password ?</h6>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
