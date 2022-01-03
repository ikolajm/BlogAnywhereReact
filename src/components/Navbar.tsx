import {useState, Fragment, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from "../context/UserContext";
import UserUpdateContext from "../context/UserUpdateContext";
import { logout } from "../helpers/auth";
import {toggleDropdown} from '../helpers/navhelpers';

export default () => {
    // If any search parameters,get them and have them applied to the db search
    let url = window.location.href;
    // Split possible search term from url
    let splitter = url.split('?q=')
    // If the url was split, take the term
    let searchTerm = splitter.length > 1 ? splitter[1] : null
    const CurrentUser = useContext(UserContext);
    const SetCurrentUser = useContext(UserUpdateContext);
    let loggedIn = CurrentUser?.token !== null && CurrentUser?.token !== '' && CurrentUser?.uuid !== null && CurrentUser?.uuid !== ''

    return (
        <nav>
            <div className="content">
                {/* Logo */}
                <NavLink to="/newsfeed" className="nav-logo--section">
                    <i className="fas fa-globe-asia"></i>
                    <h1>BlogAnywhere</h1>
                </NavLink>
                {/* Searchbar */}
                <form className='nav-search--form' action="/newsfeed">
                    <input defaultValue={searchTerm ? searchTerm : ''} type="text" name="q" placeholder="Search posts..." />
                </form>
                {/* Avatar section */}
                {
                    // Is the user logged in
                    loggedIn ?
                        // Avatar with logout dropdown
                        <div className="dropdown">
                            <div className='nav-avatar--section'>
                                <NavLink to={"/profile/" + CurrentUser?.id} className="nav-avatar">
                                    <img src={CurrentUser?.avatar} alt="" />
                                </NavLink>
                                <div className="user-details">
                                    <h1>{CurrentUser?.name}</h1>
                                    <NavLink to={'/profile/' + `${CurrentUser?.id}`}>@{CurrentUser?.username}</NavLink>
                                </div>
                            </div>
                            {/* <!-- Dropdown list --> */}
                            <button onClick={toggleDropdown} className="dropdown-button">
                                <i className="fas fa-caret-down"></i>
                            </button>
                            <div id="dropdown-content" className="dropdown-content">
                                <button onClick={e => logout(e, SetCurrentUser)}>
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