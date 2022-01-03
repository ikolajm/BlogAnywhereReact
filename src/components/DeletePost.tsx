import { deletePost,  getPostForDelete } from "../helpers/post";
import { NavLink, Navigate, useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext";
import  { useContext, useEffect, useState } from "react"
import moment from "moment"

export default () => {
    // get the id of the post from url
    let url = window.location.href;
    // Split by the post
    let splitter = url.split('/delete-post/')
    let split = splitter[1]
    const history = useNavigate();
    let CurrentUser = useContext(UserContext)
    let [post, setPost]: any = useState({id: null})

    useEffect(() => {
        let postId = split
        const getItem = async () => {
            let post = await getPostForDelete(postId, CurrentUser)
            setPost(post)
        }
        getItem()
    }, [])
    console.log(post)

    return (
        <section className="delete-post">

            <div className="background-overlay"></div>

            <div className="content">
                <form method="POST" action="">
                    <h1>Delete post</h1>
                    {   
                        !post.id ?
                            <span>Retrieving message</span> :
                            <div className="post-card">
                                <div className="post-card-content">
                                    {/* Head  */}
                                    <div className="post-card-head">
                                        <div className="user-details-container">
                                            {/* Avatar  */}
                                            <figure className="avatar">
                                                <img src={post.user.avatar} alt="" />
                                            </figure>
                                            {/* Name  */}
                                            <div className="user-details">
                                                <h1>{post.user.name}</h1>
                                                <NavLink to={"/profile/" + post.user.id}>@{post.user.username}</NavLink>
                                            </div>
                                        </div>
                                        {/* Date */}
                                        <span>{moment(post.createdAt).format('LT')}</span>
                                    </div>
                                
                                    {/* Body */}
                                    <div className="post-card-body">
                                        <p>{post.content}</p>
                                    </div>
                                
                                    {/* Like/participation */}
                                    <div className="post-card-footer">
                                        <button disabled className="likes">
                                            {
                                                post.liked ?
                                                    <i className="fas fa-heart"></i>
                                                    :
                                                    <i className="far fa-heart"></i>
                                            }
                                            <span>{post.postlikes.length} likes</span>
                                        </button>
                                        <span className="participants">
                                            {
                                                post.commented ?
                                                    <i className="fas fa-comment"></i>
                                                    :
                                                    <i className="far fa-comment"></i>
                                            }
                                            <span>{post.participants.length} participants</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                    }
                    <p>Are you sure you want to delete this post?</p>
                    <div className="button-container">
                        <NavLink to="/newsfeed" type="submit">Cancel</NavLink>
                        <button onClick={e => deletePost(e, post.id, CurrentUser, history)} className="save" type="submit">Delete</button>
                    </div>
                </form>
            </div>
            

        </section>

    )
}
