import React from "react";
import ReactMarkdown from "react-markdown";
import './Comment.css'

export const Comment = (props) => {
  const { comment } = props;
  return (
    <div className="comment">
      <div className="metadata-comment">
        <p className="comment-author">{comment.author}</p>
      </div>
      <ReactMarkdown source={comment.body} />
    </div>
  );
};

export default Comment;
