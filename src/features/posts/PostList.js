import React, { useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { fetchPosts, getPostsError, getPostsStatus } from "./PostThunk";
import PostExcerpt from "./PostExcerpt";
import { useDispatch } from "react-redux";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);
    console.log("Check postatus",postsStatus)

    const dispatch = useDispatch()

    
    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])
    

    const orderedPosts = posts
        ? posts.slice().sort((a, b) => {
            if (a.date && b.date) {
                return b.date.localeCompare(a.date);
            }
            return 0; 
        })
        : [];

    const renderPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content ? post.content.substring(0, 100) : ""}</p>

            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                {post.date && <TimeAgo timestamp={post.date} />}
            </p>
            <ReactionButtons post={post} />
        </article>
    ));
    let content;
    if (postsStatus === 'loading') {
        content = <p>"Loading...."</p>
    }
    else if (postsStatus === "succeeded") {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post}/>)
    }
    else if (postsStatus === "failed") {
        content = <p>{  error }</p>
    }

    return (
        <>
            <h2>Posts</h2>
            {renderPosts}
            {content}
        </>
    );
}

// Define PropTypes for the component
PostsList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string,
            userId: PropTypes.number.isRequired,
            date: PropTypes.string,
        })
    ),
};

export default PostsList;
