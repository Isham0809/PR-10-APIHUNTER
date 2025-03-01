import { configureStore } from "@reduxjs/toolkit";
// import postReducer from "./slice";
import postReducer from '../features/sliceFatchPost';

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});