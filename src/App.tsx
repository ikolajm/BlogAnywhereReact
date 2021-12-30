import React, { useState, useEffect } from "react";
import '../src/styles/App.scss';
// import { withRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { ToastContainer, Zoom } from "react-toastify";

import UserContext from './context/UserContext';
import UserUpdateContext from './context/UserUpdateContext';
import AuthenticatedUser from './interfaces/AuthenticatedUser';
import Navbar from './components/Navbar';
import Newsfeed from "./components/Newsfeed";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import DeletePost from "./components/DeletePost";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import EditComment from "./components/EditComment";
import DeleteComment from "./components/DeleteComment";

export default () => {
  const [CurrentUser, setCurrentUser] = useState<AuthenticatedUser>({
    uuid: null,
    token: null,
    name: "",
    email: "",
    username: "",
    avatar: "",
    bio: "",
    // created: "",
    // updated: ""
  });
  let loggedIn = CurrentUser?.token !== null && CurrentUser?.token !== '' && CurrentUser?.uuid !== null && CurrentUser?.uuid !== ''

  return (
    <UserContext.Provider value={CurrentUser}>
      <UserUpdateContext.Provider value={setCurrentUser}>
        <div className="app">
          {/* Navbar */}
          <Navbar />
          {/* Switch */}
          <Routes>
            {/* Feed */}
            <Route path="/newsfeed" element={<Newsfeed />} />
            {/* Profile */}
            <Route path="/profile/:id" element={<Profile />} />
            {/* Edit Profile */}
            <Route path="/edit-profile" element={<EditProfile />} />
            {/* View Post */}
            <Route path="/post/:id" element={<Post />} />
            {/* Create Post */}
            <Route path="/create-post" element={<CreatePost />} />
            {/* Edit Post */}
            <Route path="/edit-post/:id" element={<EditPost />} />
            {/* Delete Post */}
            <Route path="/delete-post/:id" element={<DeletePost />} />
            {/* Edit Comment */}
            <Route path="/edit-comment/:id" element={<EditComment />} />
            {/* Delete Comment */}
            <Route path="/delete-comment/:id" element={<DeleteComment />} />
            {/* Login */}
            <Route path="/login" element={<Login />} />
            {/* Signup */}
            <Route path="/signup" element={<Signup />} />
            {/* Catch root */}
            <Route path="/" element={<Navigate to='/newsfeed' />} /> 
          </Routes>
          <ToastContainer 
                position="bottom-center"
                closeButton={false}
                hideProgressBar={true}
                draggable={false}
                transition={Zoom}
                limit={1}
                autoClose={2000}
          />
        </div>
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}