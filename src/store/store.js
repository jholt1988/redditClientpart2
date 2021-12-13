import { configureStore, combineReducers } from "@reduxjs/toolkit";
import redditReducer from "./redditSlice";
import subredditsReducer from "./subredditsSlice";

export default configureStore({
    reducer:combineReducers({
      reddit: redditReducer,
      subreddits: subredditsReducer
    })
  });
