import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postReducer";
import userReducer from "./userReducer";



export const store = configureStore({
    reducer : {
        user : userReducer , 
        post : postReducer
    }
});

