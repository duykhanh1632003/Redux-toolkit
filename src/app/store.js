import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice"
import postReducer from "../features/posts/postSlice";
import usersReducer from "../features/users/usersSlice";
import PostThunk from "../features/posts/PostThunk";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postReducer,
        users: usersReducer,
        thunks: PostThunk
    }
})