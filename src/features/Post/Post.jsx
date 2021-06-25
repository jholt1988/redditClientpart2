import React from "react";
import Card from "../../componets/Card/";

export const Post = (props) => {
  const { post, togglecomments } = props;

  const renderComments = () => {
    if (post.errorLoadingComments) {
      return (
        <div>
          <h3>Error Loading Comments</h3>
        </div>
      );
    }

    if (post.loadingComments) {
      return (
        <div>
          <h3>Loading Comments</h3>
        </div>
      );
    }
    if (post.showingComments) {
      return (
        <div>
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      );
    }
    return null;
  };
  return (
    <article key={post.id}>
      <Card>
        <div className="post-container">
          <h3 className="post-title">{post.title}</h3>

          <div className="post-image-container">
            <img src={post.url} alt="" className="post-image" />
          </div>

          <div className="post-details-container">
            <span className="post-author">{post.author}</span>
          </div>

          <span className="post-comments-container">
            <button
              type="button"
              className={`icon-action-button ${
                post.showingComments && "showing comments"
              }`}
            >
              onClick={() => togglecomments(post.permalink)}
              aria-label='Show Comments'
            </button>
          </span>
          <div>{renderComments()}</div>
        </div>
      </Card>
    </article>
  );
};
