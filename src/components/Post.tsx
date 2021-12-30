import { NavLink } from "react-router-dom"

export default () => {
    return (
        <div className="single-post">
            <div className="background-overlay"></div>

            <div className="content">

                <div className="row">

                    <div className="col-lg-8 single-post--content">
                        <div className="single-post-card">
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
                                <a className="participants" href="">
                                    {/* {
                                        post.commented ? */}
                                            <i className="fas fa-comment"></i>
                                    {/* //         :
                                    //         <i className="far fa-comment"></i>
                                    // } */}
                                    <span>1 participants</span>
                                </a>
                                {/* { */}
                                    {/* // CurrentUser.id == post.author.id ? */}
                                        <div className="owner-options">
                                            <a className="edit" href="{% url 'edit-post' post.id %}">Edit</a>
                                            <a className="delete" href="{% url 'delete-post' post.id %}">Delete</a>
                                        </div>
                                        {/* : '' */}
                                {/* } */}
                            </div>

                            {/* Comments */}
                            <div className="comment-section">
                                {/* Comment */}
                                <div className="comment">
                                    {/* Head */}
                                    <div className="comment-head">
                                        <div className="user-details-container">
                                            {/* Avatar */}
                                            <figure className="avatar">
                                                <img src="https://jmi-bloganywhere.s3.us-east-2.amazonaws.com/images/avatar.png" alt="" />
                                            </figure>
                                            {/* Name */}
                                            <div className="user-details">
                                                <h1>Jake</h1>
                                                <NavLink to="/profile/1">@jmijake</NavLink>
                                            </div>
                                        </div>
                                        {/* Date */}
                                        <span>1 day ago</span>
                                    </div>
                                    <div className="comment-content">
                                        <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                                    </div>
                                    <div className="comment-footer">
                                        <button className="likes">
                                            {/* {
                                                post.liked ? */}
                                                    <i className="fas fa-heart"></i>
                                            {/* //         :
                                            //         <i class="far fa-heart"></i>
                                            // } */}
                                            <span>1 likes</span>
                                        </button>
                                        {/* { */}
                                        {/* // CurrentUser.id == post.author.id ? */}
                                            <div className="owner-options">
                                                <NavLink className="edit" to="/edit-comment/1">Edit</NavLink>
                                                <NavLink className="delete" to="/delete-comment/1">Delete</NavLink>
                                            </div>
                                            {/* : '' */}
                                        {/* } */}
                                    </div>
                                </div>
                            </div>
                            {/* Leave a comment */}
                            <div className="create-comment">
                                <form action="" method="POST">
                                    <input name="body" type="text" placeholder="Write your message here"  />
                                    <button className="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 participants">
                        <div className="post-participants-head">
                            <h1>
                                Participants
                            </h1>
                        </div>
                        <div className="post-participants-list">
                            <div className="participant-card">
                                <figure className="avatar">
                                    <img src="https://jmi-bloganywhere.s3.us-east-2.amazonaws.com/images/avatar.png" alt="" />
                                </figure>
                                <div className="user-details">
                                    <h1>Jake</h1>
                                    <NavLink to="/profile/1">@jmijake</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}