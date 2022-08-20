import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/index';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='nav-container'>
      <div className='co-icon'>
        <NavLink exact to="/">FairBnB</NavLink>
      </div>

      <label className='search-bar'>
        <input
          className='bar'
          type="text"
          placeholder="Anywhere | Any week | Add guests "
        />
        <i class="fa fa-search" id='search-icon'></i>
      </label>
      <div className='menu-bar'>
        <i class="fa fa-bars"></i>
        <i class="fa-solid fa-user"></i>
        {isLoaded && sessionLinks}
      </div>
    </div>

  );
}

export default Navigation;
