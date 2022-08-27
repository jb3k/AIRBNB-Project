import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/index';
import './Navigation.css';
import { useState, useEffect } from 'react'
import * as sessionActions from '../../store/session';



function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
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
          <div className='dropdown-login'>
            <LoginFormModal />
          </div>
          <div className='dropdown-signup'>
            <NavLink to="/signup"
              style={{ textDecoration: 'none', color: 'black' }} >
              Sign up
            </NavLink>
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



  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let logoutDropdown
  const dropdownMenu = () => {

    logoutDropdown = (
      <div className='logout-dropdown-menu'>
        <div className='logout-dropdown-menu-flex'>
          <button className='logout-bttn' onClick={logout}>Log Out</button>
        </div>
      </div>
    )

    if (!sessionUser) {
      return (
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
      )
    } else {

      return (
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
          {open && logoutDropdown}
        </div>

      )
    }
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

        {dropdownMenu()}
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

        {/* <div>
          <div className='dropdown'>
            <button className='menu-bttn' onClick={() => setOpen(!open)}>
              <div className='login-icon'>
                <i class="fa fa-bars fa-lg"></i>
              </div>
              <div className={'signup-icon'}>
                <i class="fa-solid fa-user"> </i>
              </div>
            </button>
          </div> */}


        {/* </div> */}


      </div>
    </div>

  );
}

export default Navigation;
