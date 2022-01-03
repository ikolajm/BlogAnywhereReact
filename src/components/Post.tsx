import { NavLink } from "react-router-dom"
import {useState, useEffect, useContext, Fragment} from "react"
import UserContext from "../context/UserContext";
import axios from "axios";
import APIURL from "../helpers/environment/urlSwitch";
import moment from "moment"
import { createComment, toggleCommentLikePostView } from "../helpers/comment"

export default () => {
    let CurrentUser: any = useContext(UserContext)
    // get the id of the post from url
    let url = window.location.href;
    // Split by the post
    let splitter = url.split('/post/')
    let split = splitter[1]
    let [post, setPost]: any = useState({id: null})
    let [comments, setComments]: any = useState([])
    let [participants, setParticipants]: any = useState([])
    let [commentContent, setCommentContent]: any = useState('')

    useEffect(() => {
        const getPost = async () => {
            let request: any = await axios.get(
                `${APIURL}/post/view/${split}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            request = request.data

            if  (request.status == "SUCCESS") {
                setPost(request.post)
                setComments(request.post.comments)
                setParticipants(request.post.participants)
            }
        }

        getPost()
    }, [])

    return (
        <div className="single-post">
            <div className="background-overlay"></div>

            <div className="content">

                <div className="row">

                    <div className="col-lg-8 single-post--content">
                        <div className="single-post-card">
                            {
                                !post.id ?
                                    '' :
                                    <Fragment>
                                        {/* <!-- Head --> */}
                                        <div className="post-card-head">
                                            <div className="user-details-container">
                                                {/* Avatar */}
                                                <figure className="avatar">
                                                    <img src={post.user.avatar} alt="" />
                                                </figure>
                                                {/* Name  */}
                                                <div className="user-details">
                                                    <h1>{post.user.name}</h1>
                                                    <NavLink to={"/profile/" + post.user.id}>@{post.user.username}</NavLink>
                                                </div>
                                            </div>
                                            {/* Date  */}
                                            <span>{moment(post.createdAt).format("LT")}</span>
                                        </div>
                            
                                        {/* Body */}
                                        <div className="post-card-body">
                                            <p>{post.content}</p>
                                        </div>
                            
                                        {/* Like/Participation */}
                                        <div className="post-card-footer">
                                            <button className="likes">
                                                {
                                                    CurrentUser.id && post.postlikeIds.includes(CurrentUser.id) ?
                                                        <i className="fas fa-heart"></i>
                                                        :
                                                        <i className="far fa-heart"></i>
                                                }
                                                <span>{post.postlikes.length} likes</span>
                                            </button>
                                            <a className="participants" href="">
                                                {/* {
                                                    post.commented ? */}
                                                        <i className="fas fa-comment"></i>
                                                {/* //         :
                                                //         <i className="far fa-comment"></i>
                                                // } */}
                                                <span>1 participants</span>
                                            </a>
                                            {
                                                CurrentUser.id == post.user.id ?
                                                    <div className="owner-options">
                                                        <NavLink className="edit" to={"/edit-post/" + post.id}>Edit</NavLink>
                                                        <NavLink className="delete" to={"/delete-post/" + post.id}>Delete</NavLink>
                                                    </div>
                                                    : ''
                                            }
                                        </div>

                                        {/* Comments */}
                                        <div className="comment-section">
                                            {
                                                comments && comments.length > 0 ?
                                                    comments.map((comment: any) => {
                                                        return (
                                                            <div className="comment">
                                                                {/* Head */}
                                                                <div className="comment-head">
                                                                    <div className="user-details-container">
                                                                        {/* Avatar */}
                                                                        <figure className="avatar">
                                                                            <img src={comment.user.avatar} alt="" />
                                                                        </figure>
                                                                        {/* Name */}
                                                                        <div className="user-details">
                                                                            <h1>{comment.user.name}</h1>
                                                                            <NavLink to={"/profile/" + comment.user.id}>@{comment.user.username}</NavLink>
                                                                        </div>
                                                                    </div>
                                                                    {/* Date */}
                                                                    <span>{moment(comment.createdAt).format("LT")}</span>
                                                                </div>
                                                                <div className="comment-content">
                                                                    <p>{comment.content}</p>
                                                                </div>
                                                                <div className="comment-footer">
                                                                    <button onClick={e => toggleCommentLikePostView(e, comment, CurrentUser, post, setComments)} className="likes">
                                                                        {
                                                                            CurrentUser.id && comment.commentlikeIds.includes(CurrentUser.id) ?
                                                                                <i className="fas fa-heart"></i>
                                                                            :
                                                                                <i className="far fa-heart"></i>
                                                                        }
                                                                        <span>{comment.commentlikes.length} likes</span>
                                                                    </button>
                                                                    {
                                                                        CurrentUser.id == comment.user.id ?
                                                                            <div className="owner-options">
                                                                                <NavLink className="edit" to={"/edit-comment/" + comment.id}>Edit</NavLink>
                                                                                <NavLink className="delete" to={"/delete-comment/" + comment.id}>Delete</NavLink>
                                                                            </div>
                                                                            : ''
                                                                    }
                                                                </div>
                                                            </div> 

                                                        )
                                                    })
                                                    :
                                                    <span>No comments yet, be the first!</span>
                                            }
                                        </div>
                                        {/* Leave a comment */}
                                        <div className="create-comment">
                                            <form action="" method="POST">
                                                <input onChange={e => setCommentContent(e.target.value)} value={commentContent} name="body" type="text" placeholder="Write your message here"  />
                                                <button onClick={(e => createComment(e, commentContent, post, setPost, CurrentUser, setCommentContent, setParticipants))} className="submit">Submit</button>
                                            </form>
                                        </div>
                                    </Fragment>
                            }
                        </div>
                    </div>

                    <div className="col-lg-4 participants">
                        <div className="post-participants-head">
                            <h1>
                                Participants
                            </h1>
                        </div>
                        <div className="post-participants-list">
                            {
                                participants.length > 0 ?
                                    participants.map((user: any) => {
                                        return (
                                            <div className="participant-card">
                                                <figure className="avatar">
                                                    <img src={user.avatar} alt="" />
                                                </figure>
                                                <div className="user-details">
                                                    <h1>{user.name}</h1>
                                                    <NavLink to={"/profile/" + user.id}>@{user.username}</NavLink>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : <span>Be the first to participate</span>

                            }
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}