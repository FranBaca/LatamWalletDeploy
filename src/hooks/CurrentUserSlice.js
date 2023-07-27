import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: null
}

export const CurrentUserSlice = createSlice({
    name : "CurrentUser",
    initialState,
    reducers: {
        getCurrentUser : (state,action) =>{
            state.user = action;
        }
    }
    
})


export const { getCurrentUser } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
