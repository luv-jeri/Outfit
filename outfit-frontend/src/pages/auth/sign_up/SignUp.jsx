import React, { useState } from 'react';
import s from './SignUp.module.css';
import { useAuth } from '../../../context/Auth.context';
import { useNavigate } from 'react-router-dom';
import UploaderComponent from '../../../components/uploader/Uploader.component';


function SignUp() {
  const { sign_up } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  console.log(image);

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    sign_up({
      photo: image,
      name,
      email,
      password,
      confirmPassword,
    });
  };

  const handleNavigate = () => {
    navigate('/sign_in');
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        <h1>Sign Up</h1>

        <form onSubmit={handleClick}>
          <div className={s.input}>
            <UploaderComponent onUpload={setImage} />
          </div>
          <div className={s.input}>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              required
              id='name'
              value={name}
              className={s.input_field}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={s.input}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              required
              id='email'
              value={email}
              className={s.input_field}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={s.input}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              required
              name='password'
              id='password'
              value={password}
              className={s.input_field}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={s.input}>
            <label htmlFor='confirm_password'>Confirm Password</label>
            <input
              type='password'
              required
              name='confirm_password'
              id='confirm_password'
              value={confirmPassword}
              className={s.input_field}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type='submit'>Sign Up</button>
          <h6 onClick={handleNavigate}>Already a user ?</h6>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
