import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/index';
import './Navigation.css';
import { useState, useEffect } from 'react'


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const [open, setOpen] = useState(false)


  const history = useHistory()
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='.dropdown-menu'>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='dropdown-menu'>
        <div className='flex-dropdown-menu'>
          <div className='dropdown-signup'>
            <NavLink to="/signup"
              style={{ textDecoration: 'none', color: 'black' }} >
              Sign up
            </NavLink>
          </div>
          <div className='dropdown-login'>
            <LoginFormModal />
          </div>
        </div>
      </div>
    );
  }

  const wordSwitcher = () => {
    if (sessionUser) {
      return "Switch to hosting"
    } else {
      return "Become a host"
    }
  }

  useEffect(() => {
    wordSwitcher()
  }, [wordSwitcher])


  const loginAlert = () => {
    let login = false;
    if (!sessionUser) {
      alert('Need to login to become a host');
      history.push('/')
    } else {
      login = true;
      history.push('/spots/current')
    }
    return login
  }

  return (
    <div className='topNav-container'>
      <div className='nav-container'>
        <div className='logo-container'>
          <NavLink exact to="/" className={'company'}
            style={{ textDecoration: 'none' }}>
            <i class="fa-solid fa-handshake"> </i> | FairBnB
          </NavLink>

        </div>
        <div className='become-host'>
          {/* <NavLink to='/spots/current'> */}
          <button className='host-button' onClick={loginAlert}>{wordSwitcher()}</button>
          {/* </NavLink> */}
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

        <div>
          <div className='dropdown'>
            <button className='menu-bttn' onClick={() => setOpen(!open)}>
              <div className='login-icon'>
                <i class="fa fa-bars fa-lg"></i>
              </div>
              <div className={'signup-icon'}>
                <i class="fa-solid fa-user"> </i>
              </div>
            </button>
          </div>
          {open && sessionLinks}

        </div>


      </div>
    </div>

  );
}

export default Navigation;
