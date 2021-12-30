import { NavLink } from "react-router-dom"

export default () => {
    return (
            <section className="delete-post">

                <div className="background-overlay"></div>

                <div className="content">
                    <form method="POST" action="">
                        <h1>Delete post</h1>
                        <div className="post-card">
                            <div className="post-card-content">
                                {/* Head  */}
                                <div className="post-card-head">
                                    <div className="user-details-container">
                                        {/* Avatar  */}
                                        <figure className="avatar">
                                            <img src="https://jmi-bloganywhere.s3.us-east-2.amazonaws.com/images/avatar.png" alt="" />
                                        </figure>
                                        {/* Name  */}
                                        <div className="user-details">
                                            <h1>Jake</h1>
                                            <NavLink to="/profile/1">@jmijake</NavLink>
                                        </div>
                                    </div>
                                    {/* Date */}
                                    <span>1 days ago</span>
                                </div>
                            
                                {/* Body */}
                                <div className="post-card-body">
                                    <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </div>
                            
                                {/* Like/participation */}
                                <div className="post-card-footer">
                                    <button disabled className="likes">
                                        {/* {
                                            post.liked ? */}
                                                <i className="fas fa-heart"></i>
                                        {/* //         :
                                        //         <i class="far fa-heart"></i>
                                        // } */}
                                        <span>1 likes</span>
                                    </button>
                                    <span className="participants">
                                        {/* {
                                            post.commented ? */}
                                                <i className="fas fa-comment"></i>
                                        {/* //         :
                                        //         <i className="far fa-comment"></i>
                                        // } */}
                                        <span>1 participants</span>
                                    </span>
                                </div>
                            </div>
                        
                        </div>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="button-container">
                            <NavLink to="/newsfeed" type="submit">Cancel</NavLink>
                            <button className="save" type="submit">Delete</button>
                        </div>
                    </form>
                </div>
                

            </section>

    )
}
