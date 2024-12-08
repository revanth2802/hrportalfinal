import React, { useState, useEffect } from "react";

function DepartmentEmployees({ departmentId }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch the list of employees for the given departmentId
    // Example: axios.get(`/departments/${departmentId}/employees`).then(response => setEmployees(response.data));
  }, [departmentId]);

  return (
    <div>
      <h3>Employees in Department: {departmentId}</h3>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentEmployees;
