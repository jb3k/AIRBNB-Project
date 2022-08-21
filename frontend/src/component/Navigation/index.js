import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/index';
import './Navigation.css';
import { useState, useEffect } from 'react'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)

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
        <div>
          <label className='search-bar'>
            <input
              className='bar'
              type="text"
              placeholder="Anywhere | Any week | Add guests "
            />
            <i class="fa fa-search" id='search-icon'></i>
          </label>
        </div>
        <div className='dropdown'>
          <button className='menu-bttn'>

            {isLoaded && sessionLinks}
          </button>
          <div className='dropdown-menu'>
            {sessionLinks}

          </div>
        </div>
      </div>
    </div>

  );
}

export default Navigation;
