import AuthInput from "./reusable/FormInput";
import React, { useState, useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import UserUpdateContext from "../context/UserUpdateContext";
import _UserContext from "../context/UserContext";
import { signup } from "../helpers/auth"

export default () => {
    const [_name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const SetCurrentUser = useContext(UserUpdateContext);
    const CurrentUser = useContext(_UserContext)
    const loggedIn = CurrentUser?.token !== null && CurrentUser?.token !== '' && CurrentUser?.uuid !== null && CurrentUser?.uuid !== ''

    if (loggedIn) {
        return <Navigate to='/newsfeed' />
    }

    return (
        <div className="signup-section">
            <div className="background-overlay"></div>
            <div className="content">
                <form action="POST">
                    <h1>Sign up!</h1>
                    {/* Name */}
                    <AuthInput
                        forId="name"
                        incomingFor="name"
                        handleChange={setName}
                        label="Name"
                        type="text"
                        value={_name}
                    />
                    {/* Username */}
                    <AuthInput
                        forId="username"
                        incomingFor="username"
                        handleChange={setUsername}
                        label="Username"
                        type="text"
                        value={username}
                    />
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
                    {/* Confirm Password */}
                    <AuthInput
                        forId="confirm"
                        incomingFor="confirm"
                        handleChange={setConfirm}
                        label="Confirm Password"
                        type="password"
                        value={confirm}
                    />
                    <div className="form-footer">
                        <button type="submit"
                            onClick={e => signup(
                                e,
                                {
                                    name: _name,
                                    username,
                                    email,
                                    password,
                                    confirm
                                },
                                SetCurrentUser
                            )}
                        >Submit</button>
                        <NavLink id="friendsRoute" to="/login" className="form-footer--link">
                            <span>I have an account</span>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}