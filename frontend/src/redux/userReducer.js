import { createSlice } from "@reduxjs/toolkit"



export const userSlice = createSlice({
    name : 'user' ,
    initialState : { user : {} },
    reducers : {
        storeUserDetail : (state , action ) => {
            state.user = action.payload
        } , 
        storeNewPost : (state , { payload }) => {
            state.user.posts = [payload.post , ...state.user.posts];
        }
    }
});


export const { storeUserDetail , storeNewPost } = userSlice.actions;
export default userSlice.reducer;