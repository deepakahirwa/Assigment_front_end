import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: null,
    isAdminLoggedIn: false
}

const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loginAdmin: (state, action) => {

            state.admin = action.payload;
            state.isAdminLoggedIn = true;
            // console.log("loginAdmin Slice",state.admin);
        },
        logoutAdmin: (state, action) => {
            state.admin = null
            state.isAdminLoggedIn = false;
        }
    }
})

export const { loginAdmin, logoutAdmin } = AdminSlice.actions;

export default AdminSlice.reducer;

