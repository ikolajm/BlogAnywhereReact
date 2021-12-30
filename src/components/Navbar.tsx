import {useState, Fragment, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from "../context/UserContext";
import { logout } from "../helpers/auth";
import {toggleDropdown} from '../helpers/navhelpers';

export default () => {
    const CurrentUser = useContext(UserContext);
    let loggedIn = CurrentUser?.token !== null && CurrentUser?.token !== '' && CurrentUser?.uuid !== null && CurrentUser?.uuid !== ''
    console.log(loggedIn)
    console.log(CurrentUser)

    return (
        <nav>
            <div className="content">
                {/* Logo */}
                <NavLink to="/newsfeed" className="nav-logo--section">
                    <i className="fas fa-globe-asia"></i>
                    <h1>BlogAnywhere</h1>
                </NavLink>
                {/* Searchbar */}
                <form className='nav-search--form' action="GET">
                    <input type="text" name="q" placeholder="Search posts..." />
                </form>
                {/* Avatar section */}
                {
                    // Is the user logged in
                    loggedIn ?
                        // Avatar with logout dropdown
                        <div className="dropdown">
                            <div className='nav-avatar--section'>
                                <figure className="nav-avatar">
                                    <img src="https://jmi-bloganywhere.s3.us-east-2.amazonaws.com/images/avatar.png" alt="" />
                                </figure>
                                <div className="user-details">
                                    <h1>{CurrentUser?.name}</h1>
                                    <a href="">@{CurrentUser?.username}</a>
                                </div>
                            </div>
                            {/* <!-- Dropdown list --> */}
                            <button onClick={toggleDropdown} className="dropdown-button">
                                <i className="fas fa-caret-down"></i>
                            </button>
                            <div id="dropdown-content" className="dropdown-content">
                                <button onClick={logout}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    Logout
                                </button>
                            </div>
                        </div>
                        : <NavLink to="/login" className="nav-login">Login</NavLink>
                }
            </div>
        </nav>
    )
}