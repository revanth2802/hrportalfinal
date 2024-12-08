import axios from 'axios';

const API_BASE_URL = "http://localhost:5001"; // Assuming your Flask API is running on port 5000

class DepartmentService {
    // Fetch all departments, optionally with employee counts
    static fetchDepartments(countEmployees = false) {
        return axios.get(`${API_BASE_URL}/departments?count_employees=${countEmployees}`);
    }

    // Fetch employees of a specific department
    static fetchEmployeesByDepartment(dept_no) {
        return axios.get(`${API_BASE_URL}/departments/${dept_no}/employees`);
    }

    // ... Any other API related functions for departments ...
}

export default DepartmentService;
