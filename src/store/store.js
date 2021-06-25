import  {createStore} from '@reduxjs/toolkit;'

const store = () => createStore({
  reducers: {
    reddit:redditReducer
  }
})