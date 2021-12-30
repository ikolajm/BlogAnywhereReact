import { NavLink } from "react-router-dom"

export default () => {
    return (
        <div className="create-post">
            <div className="background-overlay"></div>

            <div className="content">

                <form action="POST" className="create-post--form">
                    <h1>Create a post</h1>
                    <div className="input-group">
                        <label htmlFor="content">Content:</label>
                        <textarea name="content" id="content" cols={10} rows={10}>
                        </textarea>
                    </div>
                    <div className="form-footer">
                        <NavLink to="/newsfeed">Go back</NavLink>
                        <button className="save">Create</button>
                    </div>
                </form>

            </div>
        </div>
    )
}