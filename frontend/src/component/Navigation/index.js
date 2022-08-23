import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/index';
import './Navigation.css';
import { useState, useEffect } from 'react'


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)

  const history = useHistory()
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/signup"
          style={{ textDecoration: 'none', color: 'black' }} >
          Sign up
        </NavLink>
        <LoginFormModal />
      </>
    );
  }


  const loginAlert = () => {
    let login = false;
    if (!sessionUser) {
      alert('Need to login to become a host');
      history.push('/')
    } else {
      login = true;
      history.push('/spots/form')
    }
    return login
  }

  return (
    <div className='topNav-container'>
      <div className='nav-container'>
        <div>
          <NavLink exact to="/" className={'company'}
            style={{ textDecoration: 'none' }}>
            <i class="fa-solid fa-handshake"></i> | FairBnB
          </NavLink>

        </div>
        <div className='become-host'>
          <button className='host-button' onClick={loginAlert}> Become a host</button>
        </div>
        {/* <div>
          <label className='search-bar'>
            <input
              className='bar'
              type="text"
              placeholder="Anywhere | Any week | Add guests "
            />
            <i class="fa fa-search" id='search-icon'></i>
          </label>
        </div> */}

        <div className='dropdown'>
          <button className='menu-bttn'>
            <div className='login-icon'>
              <i class="fa fa-bars fa-lg"></i>
            </div>
            <div className={'signup-icon'}>
              <i class="fa-solid fa-user"> </i>
            </div>
          </button>

          <div className='dropdown-menu'>
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Navigation;
