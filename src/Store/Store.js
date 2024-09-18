import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from "./AdminSlice";
const Store = configureStore({
    reducer:{
         
         admin:AdminSlice
    }
})

export default Store;