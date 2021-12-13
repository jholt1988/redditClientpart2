import { createSlice } from "@reduxjs/toolkit";
import { getSubreddits } from "../api/reddit";

export const initialState = {
  subreddits: [],
  isLoading: false,
  errorLoading: false
};

export const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: initialState,
  reducers: {
    startGetSubreddits: (state) => {
      state.isLoading = true;
      state.errorLoading = false;
    },
    completeGetSubreddits: (state, action) => {
      state.isLoading = false;
      state.errorLoading = false;
      state.subreddits = action.payload;
    },
    errorLoadingSubreddits: (state) => {
      state.isLoading = false;
      state.errorLoading = true;
    }
  }
});

export const selectSubreddits = (state) => state.subredditsSlice.subreddits;

export default subredditsSlice.reducer;

export const {
  startGetSubreddits,
  completeGetSubreddits,
  errorLoadingSubreddits
} = subredditsSlice.actions;

export const fetchSubreddits = () => async (dispatch) => {
  try {
    dispatch(startGetSubreddits());
    const subreddits = await getSubreddits();
    dispatch(completeGetSubreddits(subreddits));
  } catch (error) {
    dispatch(errorLoadingSubreddits());
  }
};
