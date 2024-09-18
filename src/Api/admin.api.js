import { axiosInstance } from '../Conf/Conf';
class AdminApi {
    // Create a new admin

    async createAdmin(userData) {
        try {
            console.log(userData);

            const response = await axiosInstance.patch('/admin', userData);
            console.log(response);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Login admin
    async loginAdmin(credentials) {

        try {
            const response = await axiosInstance.post('/admin/login', credentials);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Logout admin
    async logoutAdmin() {
        try {
            const response = await axiosInstance.get('/admin/logout');
            console.log(response);
            return response;
        } catch (error) {
            throw error;
        }
    }


    async profile() {
        try {
            // console.log(axiosInstance);

            const response = await axiosInstance.get('/admin/get');

            // console.log(response.data);
            return response.data

        } catch (error) {
            throw error
        }
    }



}

const adminService = new AdminApi();
export default adminService;
