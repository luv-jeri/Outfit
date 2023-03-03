import React, { useState } from 'react';
import s from './SendOTP.module.css';
import { useAuth } from '../../../context/Auth.context';
import { useNotification } from '../../../wrappers/notification/Notification.wrapper';
import { useNavigate } from 'react-router-dom';

function SendOTP() {
  const navigate = useNavigate();
  const { send_reset_otp_email } = useAuth();
  const [email, setEmail] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    send_reset_otp_email(email);
  };

  const handleNavigate = () => {
    navigate('/sign_in');
  }
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
          <button type='submit' onClick={handleClick}>
            Send OTP
          </button>
          <h6 onClick={handleNavigate}>Rember password ?</h6>
        </form>
      </div>
    </div>
  );
}

export default SendOTP;
