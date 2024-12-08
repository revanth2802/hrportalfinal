import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../common/constants';
function DepartmentSalaryStats() {
    const [averageSalaries, setAverageSalaries] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(BASE_URL + '/average_salary_per_department');
                setAverageSalaries(response.data.data);
            } catch (error) {
                console.error("Error fetching average salaries per department:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log("Set average salaries in component:", averageSalaries);
    }, [averageSalaries]);

    return (
        <div>
            <h2>Department Average Salaries</h2>
            <ul>
                {averageSalaries.map((dept, index) => (
                    <li key={index}>
                        {dept.dept_name}: ${dept.averageSalary.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default DepartmentSalaryStats;
