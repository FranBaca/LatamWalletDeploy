import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../hooks/modalSlice";
import userReducer from "../hooks/CurrentUserSlice"

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
  },
});

