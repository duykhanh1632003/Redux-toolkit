import { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { postAdded } from "./postSlice";
import { selectAllPosts } from "./postSlice";

const AddPostForm = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [usersId, setUsersId] = useState('')

    const users = useSelector(selectAllPosts)

    const dispatch = useDispatch()
    
    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAuthorChange = e => setUsersId(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content , usersId)
            )
            setTitle('')
            setContent('')
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(usersId)

    const usersOption = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return ( 
        <section>
            <h2>Add a new Post</h2>
            <form>
                <label htmlFor="postTitle">Post title :</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="postContent">Content: </label>
                <select id="postAuthor" value={usersId} onChange={onAuthorChange}>
                    <option value=""></option>
                    {usersOption}
                </select>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                />
                <button type="button"
                    onClick={onSavePostClicked}
                >Save post</button>
            </form>
        </section>
     );
}
 
export default AddPostForm;