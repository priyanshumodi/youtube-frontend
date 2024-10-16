import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:{
        _id:"",
        name:"guest",
        username: "guest777",
        email: "guest@gmail.com",
        avatar: "https://icons.veryicon.com/png/o/miscellaneous/youyinzhibo/guest.png",
        coverImage: ""
    },
    isAuthenticated: false
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            console.log(action.payload)
            state.user = {
                _id: action.payload._id,
                name: action.payload.fullName,
                username: action.payload.username,
                email: action.payload.email,
                avatar: action.payload.avatar,
                coverImage: action.payload.coverImage
            }

            state.isAuthenticated = true

        },

        removeUser: (state,action) => {
            state.user = initialState.user
            state.isAuthenticated = false
        }
    }
})

export const {addUser, removeUser} = userSlice.actions
export default userSlice.reducer