import AuthInput from "./reusable/FormInput";
import React, { useState, useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { login } from "../helpers/auth"
import UserUpdateContext from "../context/UserUpdateContext";
import _UserContext from "../context/UserContext";


export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const SetCurrentUser = useContext(UserUpdateContext);
    const CurrentUser = useContext(_UserContext)
    const loggedIn = CurrentUser?.token !== null && CurrentUser?.token !== '' && CurrentUser?.uuid !== null && CurrentUser?.uuid !== ''

    if (loggedIn) {
        return <Navigate to='/newsfeed' />
    }

    return (
        <div className="login-section">
            <div className="background-overlay"></div>
            <div className="content">
                <form action="POST">
                    <h1>Welcome back!</h1>
                    {/* Email */}
                    <AuthInput
                        forId="email"
                        incomingFor="email"
                        handleChange={setEmail}
                        label="Email"
                        type="text"
                        value={email}
                    />
                    {/* Password */}
                    <AuthInput
                        forId="password"
                        incomingFor="password"
                        handleChange={setPassword}
                        label="Password"
                        type="password"
                        value={password}
                    />
                    <div className="form-footer">
                        <button type="submit"
                        onClick={e => login(
                            e,
                            {
                                email,
                                password
                            },
                            SetCurrentUser
                        )}>Submit</button>
                        <NavLink id="friendsRoute" to="/signup" className="form-footer--link">
                            <span>I don't have an account</span>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}