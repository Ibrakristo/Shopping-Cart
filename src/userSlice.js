import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        time: null,
        name: "",
        email: "",
        profile: false
    },
    reducers: {
        loggedIn(state, action) {
            const date = new Date();
            date.setHours(date.getHours() + 1)
            return { token: action.payload.token, time: date, name: action.payload.name, email: action.payload.email, profile: state.profile };
        },
        loggedOut(state, action) {
            return { token: null, time: null, name: "", email: "", profile: state.profile };
        },
        changeProfile(state, action) {
            return { ...state, ...action.payload };
        }
    }
});

export const { loggedIn, loggedOut, changeProfile } = userSlice.actions;
export default userSlice.reducer;
