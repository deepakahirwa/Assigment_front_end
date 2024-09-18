
import { useDispatch } from "react-redux";
import Store from './Store/Store';
import adminService from './Api/admin.api'
import { loginAdmin } from "./Store/AdminSlice";

const AdminProfileLoader = async () => {

    const profile = await adminService.profile();
    
    const admin = profile.data;
    Store.dispatch(loginAdmin(admin));
    return profile;
}





export {AdminProfileLoader};