

import axios from "axios";

const BASE_URL = "https://localhost:5001";

export const fetchAverageSalaryPerDepartment = async () => {
    try {
        const response = await axios.get(BASE_URL + '/average_salary_per_department');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching average salary per department:", error);
        throw error;
    }
};
