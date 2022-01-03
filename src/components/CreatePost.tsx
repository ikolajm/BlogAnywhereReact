import { useContext, useState } from "react"
import { NavLink, Navigate, useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext";
import { createPost } from "../helpers/post";

export default () => {
    const history = useNavigate();
    let CurrentUser = useContext(UserContext)
    const [postContent, setContent] = useState('')
    let loggedIn = CurrentUser?.token !== null && CurrentUser?.id !== null && CurrentUser?.uuid !== null

    if (!loggedIn) {
        console.log(loggedIn, CurrentUser)
        return <Navigate to='/login' />
    }

    return (
        <div className="create-post">
            <div className="background-overlay"></div>

            <div className="content">

                <form action="POST" className="create-post--form">
                    <h1>Create a post</h1>
                    <div className="input-group">
                        <label htmlFor="content">Content:</label>
                        <textarea value={postContent} name="content" id="content" cols={10} rows={10} onChange={e => setContent(e.target.value)}>
                        </textarea>
                    </div>
                    <div className="form-footer">
                        <NavLink to="/newsfeed">Go back</NavLink>
                        <button onClick={e => createPost(e, postContent, CurrentUser, history)} className="save">Create</button>
                    </div>
                </form>

            </div>
        </div>
    )
}