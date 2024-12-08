import React, { useState, useEffect } from "react";
import './EmployeeDetails.css';
import EmployeeService from '../services/EmployeeService';

function EmployeeDetails({ employee }) {
    const [departmentName, setDepartmentName] = useState("Loading...");
    const [manager, setManager] = useState("Not Available");
    const [salary, setSalary] = useState(null);
    const [title, setTitle] = useState(null);

    useEffect(() => {
        if (employee && employee.emp_no) {
            // Fetch department details for the employee
            EmployeeService.fetchDepartment(employee.emp_no)
                .then(response => {
                    if (response.data && response.data.data.length > 0) {
                        const deptNo = response.data.data[0].dept_no;
                        // Fetch the name of the department using the dept_no
                        EmployeeService.fetchDepartmentName(deptNo)
                            .then(response => {
                                if (response.data && response.data.data.length > 0) {
                                    setDepartmentName(response.data.data[0].dept_name);
                                } else {
                                    setDepartmentName('Not Available');
                                }
                            })
                            .catch(error => {
                                console.error("Error fetching department name:", error);
                                setDepartmentName('Not Available');
                            });
                    } else {
                        setDepartmentName('Not Available');
                    }
                })
                .catch(error => {
                    console.error("Error fetching current department:", error);
                    setDepartmentName('Not Available');
                });
            EmployeeService.fetchEmployeeDetails(employee.emp_no)
                .then(response => {
                    if (response.data && response.data.manager) {
                        setManager(`${response.data.manager.first_name} ${response.data.manager.last_name}`);
                    }
                })
                .catch(error => console.error("Error fetching manager details:", error));
            EmployeeService.fetchSalary(employee.emp_no)
                .then(response => {
                    if (response.data && response.data.data.length > 0) {
                        setSalary(response.data.data[0].salary);
                    }
                })
                .catch(error => console.error("Error fetching salary:", error));
            EmployeeService.fetchTitle(employee.emp_no)
                .then(response => {
                    if (response.data && response.data.data.length > 0) {
                        setTitle(response.data.data[0].title);
                    }
                })
                .catch(error => console.error("Error fetching title:", error));
        }
    }, [employee]);

    if (!employee) {
        return <div>Select an employee to view details.</div>;
    }

    return (
        <div>
            <h3>Employee Details:</h3>
            <p><strong>Employee No.:</strong> {employee.emp_no}</p>
            <p><strong>First Name:</strong> {employee.first_name}</p>
            <p><strong>Last Name:</strong> {employee.last_name}</p>
            <p><strong>DOB:</strong> {employee.birth_date}</p>
            <p><strong>Hire Date:</strong> {employee.hire_date}</p>
            <p><strong>Gender:</strong> {employee.gender}</p>
            <p><strong>Department:</strong> {departmentName}</p>
            <p><strong>Manager:</strong> {manager}</p>
            <p><strong>Salary:</strong> {salary}</p>
            <p><strong>Title:</strong> {title}</p>
        </div>
    );
}

export default EmployeeDetails;
