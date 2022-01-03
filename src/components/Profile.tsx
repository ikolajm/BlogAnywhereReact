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
    let splitter = url.split('?search=')
    // Split id
    let userId: any = url.split('/')
    userId = userId[userId.length - 1]
    userId = userId.split('?')
    userId = userId[0]
    // If the url was split, take the term
    let searchTerm = splitter.length > 1 ? splitter[1] : null
    let [posts, setPosts]: any = useState([])
    let [recent, setRecent]: any = useState([])
    let [userProfile, setUserProfile]: any = useState({id: null})

    useEffect(() => {
        const getProfile = async () => {
            let search = !searchTerm ? '' : `?search=${searchTerm}`
            let request: any = await axios.get(
                `${APIURL}/user/${userId}${search}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            request = request.data

            if  (request.status == "SUCCESS") {
                console.log(request.posts)
                setPosts(request.posts)
                setRecent(request.activity)
                setUserProfile(request.user)
            }
        }

        getProfile()
    }, [])

    return (
        <div className="profile">
            <div className="background-overlay"></div>

            <div className="content">
                <div className="row">

                    {/* Profile */}
                    <div className="profile-card col-lg-3">
                        {
                            userProfile.id ?
                                <div className="profile-content">
                                    <div className='profile-avatar--section'>
                                        <figure className="profile-avatar">
                                            <img src={userProfile.avatar} alt="" />
                                        </figure>
                                        <div className="user-details">
                                            <h1>{userProfile.name}</h1>
                                            <NavLink to={"/profile/" + userProfile.id}>@{userProfile.username}</NavLink>
                                        </div>
                                    </div>
                                    <div className="bio-section">
                                    <p>{userProfile.bio}</p>
                                    </div>
                                    <NavLink className="edit-profile" to={"/edit-profile/" + userProfile.id}>Edit Profile</NavLink>
                                </div>
                                :
                                ''
                        }
                    </div>

                    {/* Feed with search */}
                    <div className="feed col-lg-6">
                        {/* Search */}
                        <form className='nav-search--form' action={"/profile/" + userProfile.id}>
                            <input defaultValue={searchTerm ? searchTerm : ''} type="text" name="search" placeholder="Search user's posts..." />
                        </form>
                        {
                            posts.length > 0 ?
                                <Fragment>
                                    {/* Post count */}
                                    <h1 className="post-count">{posts.length} posts to view</h1>
                                    {
                                        posts.map((post:any) => {
                                            return (
                                                <div className="post-card">
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
                                                        
                                                        <span>{moment(post.createdAt).format("LT")}</span>
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
                                                                console.log(post)
                                                            }
                                                            {
                                                                CurrentUser.id && post.currentParticipantsId.includes(CurrentUser.id) ?
                                                                    <i className="fas fa-comment"></i>
                                                                    :
                                                                   <i className="far fa-comment"></i>
                                                            }
                                                            <span>{post.participants.length} participants</span>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Fragment>
                                : ''
                        }
                    </div>

                    {/* Recent activity */}
                    <div className="activity col-lg-3">
                        <div className="recent-head">
                            <h1>Recent Activity</h1>
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