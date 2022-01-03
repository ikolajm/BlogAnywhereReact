import AuthInput from "./reusable/FormInput";
import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext";
import UserUpdateContext from "../context/UserUpdateContext";
import { getUserProfile, editUser } from "../helpers/profile";

export default () => {
    // get the id of the post from url
    let url = window.location.href;
    // Split by the post
    let splitter = url.split('/edit-profile/')
    let split = splitter[1]

    let CurrentUser: any = useContext(UserContext)
    let UpdateCurrentUser: any = useContext(UserUpdateContext)
    const history = useNavigate();
    const [avatar, setAvatar] = useState("")
    const [avatarURL, setAvatarURL] = useState("")
    const [avatarToUpload, setAvatarToUpload] = useState('')
    const [_name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        const getItem = async () => {
            let user = await getUserProfile(split, CurrentUser)
            setAvatar(user.avatar)
            // Split by the post
            let avaSplit = user.avatar.split('.com')
            let avatarURL = avaSplit[1]
            setAvatarURL(avatarURL)
            setName(user.name)
            setUsername(user.username)
            setEmail(user.email)
            setBio(user.bio)
        }
        console.log(CurrentUser)
        // if (CurrentUser.id) {
            getItem() 
        // }
    }, [])

    const fileSelected = (e: any) => {
        const file = e.target.files[0] 
        console.log(file)
        setAvatarToUpload(file)
    }

    return (
        <div className="edit-profile--section">
            <div className="background-overlay"></div>

            <div className="content">

                <form encType="multipart/form-data" method="POST" className="edit-form">
                    <h1>Edit your profile</h1>
                    {/* Avatar */}
                    <div className="avatar-input-group">
                        <label htmlFor="avatar">Avatar:</label>
                        <div className="avatar-info">
                            <figure className="profile-avatar">
                                <img src={avatar} alt="" />
                            </figure>
                            <div className="file-info">
                                <span>Current URL: {avatarURL}</span>
                                <input onChange={e => fileSelected(e)} type="file" id='avatar' name='avatar' />
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
                        <textarea value={bio} onChange={e => setBio(e.target.value)} name="bio" id="bio" cols={10} rows={10}></textarea>
                    </div>
                    <div className="form-footer">
                        <NavLink to={"/profile/" + CurrentUser.id}>Go back</NavLink>
                        <button onClick={e => editUser(e, {_name, username, email, bio, avatar: avatarToUpload}, CurrentUser, UpdateCurrentUser, history)} className="save">Save</button>
                    </div>
                </form>

            </div>
        </div>
    )
}