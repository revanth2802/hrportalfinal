import React, { useState, useEffect } from 'react';
import './DepartmentOverview.css';
import DepartmentService from '../services/DepartmentService';

function DepartmentOverview() {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        DepartmentService.fetchDepartments(true)
            .then(response => {
                setDepartments(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching departments:", error);
            });
    }, []);

    return (
        <div className="department-overview">
            {departments.map(department => (
                <div key={department.dept_no} className="department-card">
                    <h3>{department.dept_name}</h3>
                    <p>Number of Employees: {department.employee_count}</p>
                    {/* Display department head info here once available */}
                </div>
            ))}
        </div>
    );
}

export default DepartmentOverview;
