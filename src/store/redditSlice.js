import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getSubredditPosts, getPostComments } from "../api/reddit";

export const initialState = {
  posts: [],
  isLoading: false,
  error: false,
  selectedSubreddit: "/r/pictures",
  searchTerm: ""
};

 const redditSlice = createSlice({
    name: "reddit",
    initialState: initialState,
    reducers: {
      setPosts: (state, action) => {
        state.posts = action.payload;
      },
      startGetPosts: (state) => {
        state.isLoading = true;
        state.error = false;
      },
      completeGetPosts: (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.posts = action.payload;
      },
      failedGetPosts: (state) => {
        state.isLoading = false;
        state.error = true;
      },
      
      setSearchTerm: (state, action) => {
        state.searchTerm = action.payload;
      },
      setSelectedSubreddit: (state, action) => {
        state.selectedSubreddit = action.payload;
        state.searchTerm = "";
      },
      toggleComments: (state, action) => {
        state.posts[action.payload].showingComments = !state.posts[
          action.payload
        ].showingComments;
      },
      startGetComments: (state, action) => {
        state.posts[action.payload].showingComments = !state.posts[
          action.payload
        ].showingComments;

        if (!state.posts[action.payload]) {
          return;
        }
        state.posts[action.payload].loadingComments = true;
        state.posts[action.payload].errorLoadingComments = false;
      },
      completeGetComments: (state, action) => {
        state.posts[action.payload.index].comments = action.payload.index;
        state.posts[action.payload.index].loadingComments = false;
      },
      failedGetComments: (state, action) => {
        state.posts[action.payload.index].loadingComments = false;
        state.posts[action.payload.index].errorLoadingComments = false;
      }
    }
  });

export const selectPosts = (state) => state.redditSlice.posts;
export const selectSubreddit = (state) => state.redditSlice.selectedSubreddit;
export const selectSearchTerm = (state) => state.redditSlice.searchTerm;

export default redditSlice.reducer;

export const {
  startGetPosts,
  completeGetPosts,
  failedGetPosts,
  setPosts,
  setSearchTerm,
  setSelectedSubreddit,
  startGetComments,
  completeGetComments,
  failedGetComments
} = redditSlice.actions;

export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(startGetPosts());
    const posts = await getSubredditPosts(subreddit);
    const postsWithComments = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorLoadingComments: false
    }));
    dispatch(completeGetPosts(postsWithComments));
  } catch (error) {
    dispatch(failedGetPosts());
  }
};

export const fetchComments = (index, permalink) => async (dispatch) => {
  try {
    dispatch(startGetComments(index));
    const comments = await getPostComments(permalink);
    dispatch(completeGetComments({ index, comments }));
  } catch (error) {
    dispatch(failedGetComments(index));
  }
};

export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== "") {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return posts;
  }
);
