import { useContext, useEffect, useState } from "react"
import { NavLink, Navigate, useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext";
import { editPost,  getPostForEdit } from "../helpers/post";

export default () => {
    // get the id of the post from url
    let url = window.location.href;
    // Split by the post
    let splitter = url.split('/edit-post/')
    let split = splitter[1]
    const history = useNavigate();
    let CurrentUser = useContext(UserContext)
    const [postContent, setContent] = useState('')
    let loggedIn = CurrentUser?.token !== null && CurrentUser?.id !== null && CurrentUser?.uuid !== null

    if (!loggedIn) {
        return <Navigate to='/login' />
    }

    useEffect(() => {
        let postId = split
        const getItem = async () => {
            let postContent = await getPostForEdit(postId, CurrentUser)
            setContent(postContent)
        }
        getItem()
    }, [])

    return (
        <div className="edit-post">
            <div className="background-overlay"></div>

            <div className="content">

                <form action="POST" className="create-post--form">
                    <h1>Modify your post</h1>
                    <div className="input-group">
                        <label htmlFor="content">Content:</label>
                        <textarea value={postContent} onChange={e => setContent(e.target.value)} name="content" id="content" cols={10} rows={10}></textarea>
                    </div>
                    <div className="form-footer">
                        <NavLink to="/newsfeed">Go back</NavLink>
                        <button onClick={e => editPost(e, postContent, split, CurrentUser, history)} className="save">Save</button>
                    </div>
                </form>

            </div>
        </div>
    )
}