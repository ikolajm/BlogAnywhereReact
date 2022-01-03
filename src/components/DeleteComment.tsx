import moment from "moment";
import { useContext, useEffect, useState } from "react"
import { NavLink, Navigate, useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext";
import { deleteComment,  getCommentForDelete } from "../helpers/comment";

export default () => {
    // get the id of the post from url
    let url = window.location.href;
    // Split by the post
    let splitter = url.split('/delete-comment/')
    let split = splitter[1]
    const history = useNavigate();
    let CurrentUser: any = useContext(UserContext)
    const [comment, setComment]: any = useState({id: null, postId: ''})
    let loggedIn = CurrentUser?.token !== null && CurrentUser?.id !== null && CurrentUser?.uuid !== null

    if (!loggedIn) {
        return <Navigate to='/login' />
    }

    useEffect(() => {
        let commentId = split
        const getItem = async () => {
            let comment = await getCommentForDelete(commentId, CurrentUser)
            setComment(comment)
        }
        getItem()
    }, [])
    console.log(comment)

    return (
            <section className="delete-comment">

                <div className="background-overlay"></div>

                <div className="content">
                    {
                        comment && comment.id ?
                            <form method="POST" action="">
                                <h1>Delete comment</h1>
                                <div className="post-card">
                                    <div className="post-card-content">
                                        {/* Head  */}
                                        <div className="post-card-head">
                                            <div className="user-details-container">
                                                {/* Avatar  */}
                                                <figure className="avatar">
                                                    <img src={comment.user.avatar} alt="" />
                                                </figure>
                                                {/* Name  */}
                                                <div className="user-details">
                                                    <h1>{comment.user.name}</h1>
                                                    <NavLink to={"/profile/" + comment.user.id}>@{comment.user.username}</NavLink>
                                                </div>
                                            </div>
                                            {/* Date */}
                                            <span>{moment(comment.createdAt).format("LT")}</span>
                                        </div>
                                    
                                        {/* Body */}
                                        <div className="post-card-body">
                                            <p>{comment.content}</p>
                                        </div>
                                    
                                        {/* Like/participation */}
                                        <div className="post-card-footer">
                                            <button disabled className="likes">
                                                {
                                                    comment.commentlikeIds.includes(CurrentUser.id) ?
                                                        <i className="fas fa-heart"></i>
                                                        :
                                                        <i className="far fa-heart"></i>
                                                }
                                                <span>{comment.commentlikes.length} likes</span>
                                            </button>
                                        </div>
                                    </div>
                                
                                </div>
                                <p>Are you sure you want to delete this comment?</p>
                                <div className="button-container">
                                    <NavLink to={"/post/" + comment.postId} type="submit">Cancel</NavLink>
                                    <button onClick={e => deleteComment(e, comment.id, comment.postId, CurrentUser, history)} className="save" type="submit">Delete</button>
                                </div>
                            </form>
                            : <span>Retrieving message</span>
                    }
                </div>
            </section>

    )
}
