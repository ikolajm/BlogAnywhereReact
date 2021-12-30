import { NavLink } from "react-router-dom"

export default () => {
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
                        <h1 className="post-count">1 posts to view</h1>
                        {/* Post */}
                        <div className="post-card">
                            {/* <!-- Head --> */}
                            <div className="post-card-head">
                                <div className="user-details-container">
                                    {/* Avatar */}
                                    <figure className="avatar">
                                        <img src="https://jmi-bloganywhere.s3.us-east-2.amazonaws.com/images/avatar.png" alt="" />
                                    </figure>
                                    {/* Name  */}
                                    <div className="user-details">
                                        <h1>Jake</h1>
                                        <NavLink to="/profile/1">@jmijake</NavLink>
                                    </div>
                                </div>
                                {/* Date  */}
                                <span>1 day ago</span>
                            </div>
                
                            {/* Body */}
                            <div className="post-card-body">
                                <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                
                            {/* Like/Participation */}
                            <div className="post-card-footer">
                                <button className="likes">
                                    {/* {
                                        post.liked ? */}
                                            <i className="fas fa-heart"></i>
                                    {/* //         :
                                    //         <i class="far fa-heart"></i>
                                    // } */}
                                    <span>1 likes</span>
                                </button>
                                <NavLink className="participants" to="/post/1">
                                    {/* {
                                        post.commented ? */}
                                            <i className="fas fa-comment"></i>
                                    {/* //         :
                                    //         <i className="far fa-comment"></i>
                                    // } */}
                                    <span>1 participants</span>
                                </NavLink>
                                {/* { */}
                                    {/* // CurrentUser.id == post.author.id ? */}
                                        <div className="owner-options">
                                            <NavLink className="edit" to="/edit-post/1">Edit</NavLink>
                                            <NavLink className="delete" to="/delete-post/1">Delete</NavLink>
                                        </div>
                                        {/* : '' */}
                                {/* } */}
                            </div>
                
                        </div>
                    </div>

                    {/* Activity */}
                    <div className="activity col-lg-3">
                        <div className="recent-head">
                            <h1>Recent Activity</h1>
                            <a href="">View more</a>
                        </div>
                        <div className="recent-feed">

                            {/* Posted */}
                            <div className="activity-card">
                                <div className='activity-description'>
                                    <a className='username' href="">@jmijake</a>
                                    <span>posted:</span>
                                </div>
                                <div className="post-card-head">
                                    <div className="user-details-container">
                                    </div>
                                </div>
                                <div className="post-card-body">
                                    <p>
                                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged...
                                    </p>
                                </div>
                                <div className="post-card-footer">
                                    <button className="likes">
                                        {/* { */}
                                            {/* activity.liked ? */}
                                                <i className="fas fa-heart"></i>
                                                {/* :
                                                <i className="far fa-heart"></i>
                                        } */}
                                        <span>1</span>
                                    </button>
                                    <a className="participants" href="">
                                        {/* { */}
                                            {/* activity.commented ? */}
                                                <i className="fas fa-comment"></i>
                                                {/* :
                                                <i className="far fa-comment"></i>
                                        } */}
                                        <span>1</span>
                                    </a>
                                </div>
                            </div>
                            
                            {/* Commented */}
                            <div className="activity-card">
                                <div className='activity-description'>
                                    <a className='username' href="">@jmijake</a>
                                    <span>replied:</span>
                                </div>
                                <div className="post-card-head">
                                    <div className="user-details-container">
                                    </div>
                                </div>
                                <div className="post-card-body">
                                    <p>
                                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged...
                                    </p>
                                </div>
                                <div className="post-card-footer">
                                    <button className="likes">
                                        {/* { */}
                                            {/* activity.liked ? */}
                                                <i className="fas fa-heart"></i>
                                                {/* :
                                                <i className="far fa-heart"></i>
                                        } */}
                                        <span>1</span>
                                    </button>
                                    <a className="participants" href="">
                                        <i className="fas fa-file-invoice"></i>
                                        <span>View</span>
                                    </a>
                                </div>
                            </div>
                            
                            {/* PostLiked */}
                            <div className="activity-card">
                                <div className='activity-description'>
                                    <a className='username' href="">@jmijake</a>
                                    <span>liked:</span>
                                </div>
                                <div className="post-card-head">
                                    <div className="user-details-container">
                                    </div>
                                </div>
                                <div className="post-card-body">
                                    <p>
                                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged...
                                    </p>
                                </div>
                                <div className="post-card-footer">
                                    <button className="likes">
                                        {/* { */}
                                            {/* activity.post.liked ? */}
                                                <i className="fas fa-heart"></i>
                                                {/* :
                                                <i className="far fa-heart"></i>
                                        } */}
                                        <span>1</span>
                                    </button>
                                    <a className="participants" href="">
                                        {/* { */}
                                            {/* activity.post.commented ? */}
                                                <i className="fas fa-comment"></i>
                                                {/* :
                                                <i className="far fa-comment"></i>
                                        } */}
                                        <span>1</span>
                                    </a>
                                </div>
                            </div>

                            {/* CommentLiked */}
                            <div className="activity-card">
                                <div className='activity-description'>
                                    <a className='username' href="">@jmijake</a>
                                    <span>liked:</span>
                                </div>
                                <div className="post-card-head">
                                    <div className="user-details-container">
                                    </div>
                                </div>
                                <div className="post-card-body">
                                    <p>
                                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged...
                                    </p>
                                </div>
                                <div className="post-card-footer">
                                    <button className="likes">
                                        {/* { */}
                                            {/* activity.comment.liked ? */}
                                                <i className="fas fa-heart"></i>
                                                {/* :
                                                <i className="far fa-heart"></i>
                                        } */}
                                        <span>1</span>
                                    </button>
                                    <a className="participants" href="">
                                        <i className="fas fa-file-invoice"></i>
                                        <span>View</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}