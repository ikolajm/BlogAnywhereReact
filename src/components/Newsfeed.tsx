import { NavLink } from "react-router-dom"
import {useState, useEffect, useContext, Fragment} from "react"
import UserContext from "../context/UserContext";
import axios from "axios";
import APIURL from "../helpers/environment/urlSwitch";
import moment from "moment"
import { togglePostLikeNewsfeed } from "../helpers/post";
import { toggleLikeActivityFeed } from "../helpers/activity";

export default () => {
    let CurrentUser: any = useContext(UserContext)
    // If any search parameters,get them and have them applied to the db search
    let url = window.location.href;
    // Split possible search term from url
    let splitter = url.split('?q=')
    // If the url was split, take the term
    let searchTerm = splitter.length > 1 ? splitter[1] : null
    let [posts, setPosts] = useState([])
    let [recent, setRecent]: any = useState([])

    useEffect(() => {
        const getPostsAndActivity = async () => {
            let search = !searchTerm ? '' : `?q=${searchTerm}`
            let request: any = await axios.get(
                `${APIURL}/post/all${search}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            request = request.data

            if  (request.status == "SUCCESS") {
                setPosts(request.posts)
                setRecent(request.activity)
            }
        }

        getPostsAndActivity()
    }, [])

    return (
        <div className="newsfeed">
            <div className="background-overlay"></div>

            <div className="content">
                <div className="row">

                    {/* Button */}
                    <div className=" col-lg-3 create-post-col">
                        <NavLink to="/create-post">
                            <i className="fas fa-pen-square"></i>
                            Create Post
                        </NavLink>
                    </div>

                    {/* Feed */}
                    <div className="col-lg-6 feed">
                        {
                            posts.length > 0 ?
                                <Fragment>
                                    <h1 className="post-count">{posts.length} posts to view</h1>
                                    {
                                        posts.map((post: any, index) => {
                                            return (
                                                <div key={index} className="post-card">
                                                    <div className="post-card-head">
                                                        <div className="user-details-container">
                                                            <figure className="avatar">
                                                                <img src={post.user.avatar} alt="" />
                                                            </figure>
                                                            <div className="user-details">
                                                                <h1>{post.user.name}</h1>
                                                                <NavLink to={"/profile/" + post.user.id}>@{post.user.username}</NavLink>
                                                            </div>
                                                        </div>
                                                        <span>{moment(post.createdAt).format('LT')}</span>
                                                    </div>
                                        
                                                    <div className="post-card-body">
                                                        <p>{post.content}</p>
                                                    </div>
                                        
                                                    <div className="post-card-footer">
                                                        <button onClick={e=> togglePostLikeNewsfeed(e, post, CurrentUser, posts, setPosts)} className="likes">
                                                            {
                                                                CurrentUser.id && post.postlikeIds.includes(CurrentUser.id) ?
                                                                    <i className="fas fa-heart"></i>
                                                                    :
                                                               <i className="far fa-heart"></i>
                                                            }
                                                            <span>{post.postlikes.length} likes</span>
                                                        </button>
                                                        <NavLink className="participants" to={"/post/" + post.id}>
                                                            {
                                                                CurrentUser.id && post.currentParticipantsId.includes(CurrentUser.id) ?
                                                                    <i className="fas fa-comment"></i>
                                                                    :
                                                                   <i className="far fa-comment"></i>
                                                            }
                                                            <span>{post.participants.length} participants</span>
                                                        </NavLink>
                                                        {
                                                            CurrentUser?.id == post.user.id ?
                                                                <div className="owner-options">
                                                                    <NavLink className="edit" to={"/edit-post/" + post.id}>Edit</NavLink>
                                                                    <NavLink className="delete" to={"/delete-post/" + post.id}>Delete</NavLink>
                                                                </div>
                                                                : ''
                                                        }
                                                    </div>
                                        
                                                </div>
                                            )
                                        })
                                    }
                                </Fragment>
                                :
                                <Fragment>
                                    <h1 className="post-count">0 posts to view</h1>
                                    <div className="post-card">
                                        <p>No posts to view at this time.</p>
                                    </div>
                                </Fragment>
                        }
                    </div>

                    {/* Activity */}
                    <div className="activity col-lg-3">
                        <div className="recent-head">
                            <h1>Recent Activity</h1>
                            {/* <NavLink to={'/recent-activity'}>View more</NavLink> */}
                        </div>
                        <div className="recent-feed">
                            {
                                recent && recent.length > 0 ?
                                    recent.map((activity:  any) => {
                                        return (
                                            <div className="activity-card">
                                                <div className='activity-description'>
                                                    <NavLink to={"/profile/" + activity.user.id} className='username'>@{activity.user.username}</NavLink>
                                                    {
                                                        // If activity.type is posted
                                                        activity.type == 'post' ?
                                                        <span>posted:</span>
                                                        : ''
                                                    }
                                                    {
                                                        // If activity.type is commented
                                                        activity.type == 'comment' ?
                                                        <span>commented:</span>
                                                        : ''
                                                    }
                                                    {
                                                        activity.type == 'postlike' || activity.type == 'commentlike' ?
                                                        <span>liked:</span>
                                                        : ''
                                                    }
                                                </div>
                                                <div className="post-card-body">
                                                    <p>
                                                        {
                                                            // If activity.type is posted
                                                            activity.type == 'post' || activity.type == 'comment' ?
                                                            <span>{activity.content}</span>
                                                            : ''
                                                        }
                                                        {
                                                            // If activity.type is postlike
                                                            activity.type == 'postlike' ?
                                                            <span>{activity.post.content}</span>
                                                            : ''
                                                        }
                                                        {
                                                            // If activity.type is commentlike
                                                            activity.type == 'commentlike' ?
                                                            <span>{activity.comment.content}</span>
                                                            : ''
                                                        }
                                                    </p>
                                                </div>
                                                <div className="post-card-footer">
                                                    <button onClick={e => toggleLikeActivityFeed(e, activity, CurrentUser, recent, setRecent)} className="likes">
                                                        {
                                                            activity.type == 'post' ?
                                                                activity.postlikeIds.includes(CurrentUser.id) ?
                                                                    <span>
                                                                        <i className="fas fa-heart"></i>{' '}{activity.postlikeIds.length}
                                                                    </span>
                                                                    : 
                                                                    <span>
                                                                        <i className="far fa-heart"></i>{' '}{activity.postlikeIds.length}
                                                                    </span>
                                                                : ''
                                                        }
                                                        {
                                                            activity.type == 'comment' ?
                                                                activity.commentlikeIds.includes(CurrentUser.id) ?
                                                                    <span>
                                                                        <i className="fas fa-heart"></i>{' '}{activity.commentlikeIds.length}
                                                                    </span>
                                                                    : 
                                                                    <span>
                                                                        <i className="far fa-heart"></i>{' '}{activity.commentlikeIds.length}
                                                                    </span>
                                                                : ''
                                                        }
                                                        {
                                                            activity.type == 'postlike' ?
                                                                activity.post.postlikeIds.includes(CurrentUser.id) ?
                                                                    <span>
                                                                        <i className="fas fa-heart"></i>{' '}{activity.post.postlikeIds.length}
                                                                    </span>
                                                                    : 
                                                                    <span>
                                                                        <i className="far fa-heart"></i>{' '}{activity.post.postlikeIds.length}
                                                                    </span>
                                                                : ''
                                                        }
                                                        {
                                                            activity.type == 'commentlike' ?
                                                                activity.comment.commentlikeIds.includes(CurrentUser.id) ?
                                                                    <span>
                                                                        <i className="fas fa-heart"></i>{' '}{activity.comment.commentlikeIds.length}
                                                                    </span>
                                                                    : 
                                                                    <span>
                                                                        <i className="far fa-heart"></i>{' '}{activity.comment.commentlikeIds.length}
                                                                    </span>
                                                                : ''
                                                        }
                                                    </button>
                                                    <NavLink to={"/post/" + activity.id} className="participants">
                                                        {
                                                            activity.type == 'post' ?
                                                                activity.currentParticipantsId.includes(CurrentUser.id) ?
                                                                    <Fragment>
                                                                        <i className="fas fa-comment"></i>{' '}{activity.currentParticipantsId.length}
                                                                    </Fragment>
                                                                    :
                                                                    <Fragment>
                                                                        <i className="far fa-comment"></i>{' '}{activity.currentParticipantsId.length}
                                                                    </Fragment>
                                                                : ''
                                                        }
                                                        {
                                                            activity.type == 'comment' ?
                                                                activity.post.currentParticipantsId.includes(CurrentUser.id) ?
                                                                    <Fragment>
                                                                        <i className="fas fa-comment"></i>{' '}{activity.post.currentParticipantsId.length}
                                                                    </Fragment>
                                                                    :
                                                                    <Fragment>
                                                                        <i className="far fa-comment"></i>{' '}{activity.post.currentParticipantsId.length}
                                                                    </Fragment>
                                                                : ''
                                                        }

                                                        {
                                                            activity.type == 'postlike' ?
                                                                <Fragment>
                                                                    <i className="fas fa-file"></i>{' '}<span>View</span>
                                                                </Fragment>
                                                                : ''
                                                        }

                                                        {
                                                            activity.type == 'commentlike' ?
                                                                <Fragment>
                                                                    <i className="fas fa-file"></i>{' '}<span>View</span>
                                                                </Fragment>
                                                                : ''
                                                        }
                                                    </NavLink>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : ''
                            }

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}