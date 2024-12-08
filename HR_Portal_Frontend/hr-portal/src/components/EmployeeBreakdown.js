import React, { useState, useEffect } from 'react';
import DepartmentService from '../services/DepartmentService';
import EmployeeService from '../services/EmployeeService';
import './EmployeeBreakdown.css';

function EmployeeBreakdown() {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        DepartmentService.fetchDepartments()
            .then(response => {
                setDepartments(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching departments:", error);
            });
    }, []);

    const handleDepartmentChange = (event) => {
        const deptNo = event.target.value;
        setSelectedDepartment(deptNo);
        
        // Fetch employees for selected department
        EmployeeService.fetchEmployeesByDepartment(deptNo)
            .then(response => {
                setEmployees(response.data.data);
                console.log(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching employees for department:", error);
            });
    };
    return (
        <div className="employee-breakdown">
            <select onChange={handleDepartmentChange}>
                <option value="">Select a department</option>
                {departments.map(dept => (
                    <option key={dept.dept_no} value={dept.dept_no}>
                        {dept.dept_name}
                    </option>
                ))}
            </select>
            {selectedDepartment && (
                <ul>
                    {employees.map(emp => (
                        <li key={emp.emp_no}>Employee Number: {emp.emp_no}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default EmployeeBreakdown;

