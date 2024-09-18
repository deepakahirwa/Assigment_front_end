import { axiosInstance } from '../Conf/Conf';
class EmployeeApi {
    // Create a new admin

    async createEmployee(userData) {
        try {
            console.log(userData);

            const response = await axiosInstance.post('/employee', userData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    
    async getAllEmployee() {
        try {
            const response = await axiosInstance.get('/employee/get');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Get admin by ID (with credentials)
    async updateEmployee(employeeId,userData) {
        try {
            const response = await axiosInstance.patch(`/employee/${employeeId}`, userData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteEmployee(employeeId) {
        try {
            const response = await axiosInstance.delete(`/employee/${employeeId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

const employeeService = new EmployeeApi();
export default employeeService;
