import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "@reduxjs/toolkit;";
import redditReducer from "./redditSlice";
import subredditsReducer from "./subredditSlice";

export const store = () =>
  configureStore({
    reducers: {
      reddit: redditReducer,
      subreddits: subredditsReducer
    }
  });
