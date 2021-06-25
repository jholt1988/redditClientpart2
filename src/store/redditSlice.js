import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  isLoading: false,
  error: false,
  selectedSubreddit: '/r/pictures',
  searchTerm: ""
}

const redditSlice = () => createSlice({
  name:'reddit',
  initialState: initialState,
  reducers: {
    startGetPosts : (state) => {
      state.isLoading = true;
      state.error = false;
    },
    completeGetPosts : (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.posts = action.payload;
    },
    failedGetPost : (state) => {
      state.isLoading = false;
      state.error = true;
    },
    setPosts : (state, action) => {
      state.posts = action.payload
    },
    setSearchTerm : (state, action) => {
      state.searchTerm = action.payload
    },
    setSelectedSubreddit : (state, action) => {
      state.selectedSubreddit = action.payload;
    },
    toggleComments : (state)
    }
  }
})