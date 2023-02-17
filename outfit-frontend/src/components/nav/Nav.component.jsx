import React from 'react';
import s from './Nav.module.css';
import { useAuth } from '../../context/Auth.context';
import { useNavigate } from 'react-router-dom';
function NavComponent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/sign_in');
  };

  return (
    <nav className={s.container}>
      <div id='logo' className={s.logo}>
        <img src='../../../../public/icons/icons8-clothes-48.svg' />
        <h4>OUTFIT</h4>
      </div>
      <div id='search' className={s.search}>
        <input placeholder='Look up....' />
        <div id='filter' className={s.filter}>
          <img src='../../../public/icons/icons8-timeline.svg' />
        </div>
      </div>
      <div id='profile' className={s.profile}>
        <img
          onClick={() => {
            if (!user) {
              handleLogin();
            }
          }}
          src={
            user
              ? '../../../public/icons/icons8-clothes-48.svg'
              : '../../../public/icons/icons8-login-rounded.svg'
          }
        />
      </div>
    </nav>
  );
}

export default NavComponent;
