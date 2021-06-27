import React, { useEffect } from "react";
import Post from '../Post/Post'
import {
  selectFilteredPosts,
  fetchPosts,
  fetchComments,
  setSearchTerm
} from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
  const dispatch = useDispatch();
  const reddit = useSelector((state) => state.reddit);
  const { isLoading, errorLoading, searchTerm, selectedSubreddit } = reddit;
  const posts = useSelector(selectFilteredPosts);

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  const toggleComments = (index) => {
    const getComments = (permalink) => {
      dispatch(fetchComments(index, permalink));
    };

    return getComments;
  };

  if (posts.isLoading) {
    return (
      <div className="postLoading">
        <h3>POST Loading</h3>
      </div>
    );
  }

  if (posts.errorLoading) {
    return (
      <div className="error">
        <h2>Failed to load posts.</h2>
        <button
          type="button"
          onClick={() => dispatch(fetchPosts(selectedSubreddit))}
        >
          Try again
        </button>
      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <div className="error">
        <h2>No posts matching "{searchTerm}"</h2>
        <button type="button" onClick={() => dispatch(setSearchTerm(""))}>
          Go home
        </button>
      </div>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <Post
          key={post.id}
          post={post}
          onToggleComment={toggleComments(index)}
        />
      ))}
    </>
  );
};
