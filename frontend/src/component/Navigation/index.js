import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/index';
import './Navigation.css';
import { useState } from 'react'
import * as sessionActions from '../../store/session';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SearchBar from '../SeachBar';
import { searchAllThunk } from '../../store/search';



function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const history = useHistory()


  useEffect(() => {
    dispatch(searchAllThunk())
  })



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
            <NavLink to="/signup" className={'dropdown-signup'}
              style={{ textDecoration: 'none' }} >
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  const loginAlert = () => {

    if (!sessionUser) {
      return (
        <>
          <button style={{ backgroundColor: 'transparent', border: 'none', fontSize: '16px' }} onClick={() => setShowModal(true)}>Become a Host</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <LoginForm />
            </Modal>
          )}
        </>
      )
    } else {
      return (
        <>
          <NavLink to={'/spots/current'}>
            <button style={{ backgroundColor: 'transparent', border: 'none', fontSize: '16px' }}>Switch to Hosting</button>
          </NavLink>
        </>
      )

    }

  }


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let logoutDropdown
  const dropdownMenu = () => {

    logoutDropdown = (
      <div className='logout-dropdown-menu'>
        <NavLink to={'/spots/bookings'} style={{ textDecoration: 'none', color: 'black', marginTop: '2px ' }}>
          <div className='logout-dropdown-menu-flex'>
            <div className='dropdown-bookings-bttn' >
              My Bookings
            </div>
          </div>
        </NavLink>
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

  return isLoaded && (
    <div className='topNav-container'>
      <div className='nav-container'>
        <div className='logo-container'>
          <NavLink exact to="/" className={'company'}
            style={{ textDecoration: 'none' }}>
            <i class="fa-solid fa-handshake"> </i> | FairBnB
          </NavLink>
        </div>
        <div className='search-bar'>
          <SearchBar />
          <div className='search-bar-icon'>
            <i class="fa-solid fa-magnifying-glass" style={{ color: 'white', fontSize: '13px ' }}></i>
          </div>
        </div>
        <div className='become-host'>
          {/* <button className='host-button' onClick={loginAlert}>{sessionUser ? "Switch to Hosting" : 'Become a Host'}</button> */}
          <button className='host-button'>{loginAlert()}</button>
          {dropdownMenu()}
        </div>


      </div>
    </div>

  );
}

export default Navigation;
