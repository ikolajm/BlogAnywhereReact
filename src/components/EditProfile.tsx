import AuthInput from "./reusable/FormInput";
import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom"

export default () => {
    const [avatar, setAvatar] = useState("")
    const [_name, setName] = useState("Jake");
    const [username, setUsername] = useState("jmijake");
    const [email, setEmail] = useState("email");
    const [bio, setBio] = useState("It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.");

    return (
        <div className="edit-profile--section">
            <div className="background-overlay"></div>

            <div className="content">

                <form action="POST" className="edit-form">
                    <h1>Edit your profile</h1>
                    {/* Avatar */}
                    <div className="avatar-input-group">
                        <label htmlFor="avatar">Avatar:</label>
                        <div className="avatar-info">
                            <figure className="profile-avatar">
                                <img src="https://jmi-bloganywhere.s3.us-east-2.amazonaws.com/images/avatar.png" alt="" />
                            </figure>
                            <div className="file-info">
                                <span>Current URL: images/avatar.svg</span>
                                <input type="file" id='avatar' name='avatar' />
                            </div>
                        </div>
                    </div>
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
                    {/* Bio */}
                    <div className="input-group">
                        <label htmlFor="bio">Bio:</label>
                        <textarea name="bio" id="bio" cols={10} rows={10}>
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                        </textarea>
                    </div>
                    <div className="form-footer">
                        <NavLink to="/profile/1">Go back</NavLink>
                        <button className="save">Save</button>
                    </div>
                </form>

            </div>
        </div>
    )
}