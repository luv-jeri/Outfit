import React from 'react';
import s from './Nav.module.css';

function NavComponent() {
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
        <img src='../../../public/icons/icons8-clothes-48.svg'></img>
      </div>
    </nav>
  );
}

export default NavComponent;
