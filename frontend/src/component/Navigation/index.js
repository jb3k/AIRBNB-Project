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
        <NavLink to="/signup" className={'signup-icon'}>
          <i class="fa-solid fa-user" > </i>
        </NavLink>
      </>
    );
  }

  return (
    <div className='topNav-container'>
      <div className='nav-container'>
        <NavLink exact to="/" className={'company'}>
          <i class="fa-solid fa-handshake"></i> FairBnB
        </NavLink>
        <label className='search-bar'>
          <input
            className='bar'
            type="text"
            placeholder="Anywhere | Any week | Add guests "
          />
          <i class="fa fa-search" id='search-icon'></i>
        </label>
        <div className='menu-bar'>
          <button className='menu-bttn'>
            {isLoaded && sessionLinks}
          </button>
        </div>
      </div>
    </div>

  );
}

export default Navigation;
