import { useContext, useEffect, useState } from "react"
import { NavLink, Navigate, useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext";
import { editComment,  getCommentForEdit } from "../helpers/comment";

export default () => {
    // get the id of the post from url
    let url = window.location.href;
    // Split by the post
    let splitter = url.split('/edit-comment/')
    let split = splitter[1]
    const history = useNavigate();
    let CurrentUser = useContext(UserContext)
    const [commentContent, setContent] = useState('')
    const [comment, setComment] = useState({id: null, postId: ''})
    let loggedIn = CurrentUser?.token !== null && CurrentUser?.id !== null && CurrentUser?.uuid !== null

    if (!loggedIn) {
        return <Navigate to='/login' />
    }

    useEffect(() => {
        let commentId = split
        const getItem = async () => {
            let comment = await getCommentForEdit(commentId, CurrentUser)
            setContent(comment.content)
            setComment(comment)
        }
        getItem()
    }, [])
    console.log(comment)

    return (
        <div className="edit-comment">
            <div className="background-overlay"></div>

            <div className="content">

                <form action="POST" className="create-post--form">
                    <h1>Modify your comment</h1>
                    <div className="input-group">
                        <label htmlFor="content">Content:</label>
                        <textarea onChange={e => setContent(e.target.value)} value={commentContent} name="content" id="content" cols={10} rows={10}></textarea>
                    </div>
                    <div className="form-footer">
                        <NavLink to={"/post/" + comment.postId}>Go back</NavLink>
                        <button onClick={e => editComment(e, commentContent, comment.id, comment.postId, CurrentUser, history)} className="save">Save</button>
                    </div>
                </form>

            </div>
        </div>
    )
}