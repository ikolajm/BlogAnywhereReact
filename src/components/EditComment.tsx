import { NavLink } from "react-router-dom"

export default () => {
    return (
        <div className="edit-comment">
            <div className="background-overlay"></div>

            <div className="content">

                <form action="POST" className="create-post--form">
                    <h1>Modify your comment</h1>
                    <div className="input-group">
                        <label htmlFor="content">Content:</label>
                        <textarea name="content" id="content" cols={10} rows={10}>
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages..
                        </textarea>
                    </div>
                    <div className="form-footer">
                        <NavLink to="/post/1">Go back</NavLink>
                        <button className="save">Save</button>
                    </div>
                </form>

            </div>
        </div>
    )
}