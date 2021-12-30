import { NavLink } from "react-router-dom"

export default () => {
    return (
        <div className="edit-post">
            <div className="background-overlay"></div>

            <div className="content">

                <form action="POST" className="create-post--form">
                    <h1>Modify your post</h1>
                    <div className="input-group">
                        <label htmlFor="content">Content:</label>
                        <textarea name="content" id="content" cols={10} rows={10}>
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </textarea>
                    </div>
                    <div className="form-footer">
                        <NavLink to="/newsfeed">Go back</NavLink>
                        <button className="save">Save</button>
                    </div>
                </form>

            </div>
        </div>
    )
}