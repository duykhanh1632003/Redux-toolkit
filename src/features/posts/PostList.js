import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);

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

    return (
        <>
            <h2>Posts</h2>
            {renderPosts}
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
