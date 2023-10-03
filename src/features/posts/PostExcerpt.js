import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'


const PostExcerpt = ({ post }) => {
console.log("Check post",post)
  return (
      <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content ? post.body.substring(0, 100) : ""}</p>

          <p className="postCredit">
              <PostAuthor userId={post.userId} />
              {post.date && <TimeAgo timestamp={post.date} />}
          </p>
          <ReactionButtons post={post} />
      </article>
  )
}

export default PostExcerpt
