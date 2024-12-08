import React from "react";
import "./EmployeesTable.css";

function EmployeeTable({
  employees,
  onEmployeeSelect,
  onEmployeeDelete,
  onEmployeeEdit,
}) {
  const handleDeleteClick = (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      onEmployeeDelete(employeeId);
    }
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.emp_no}>
              <td>{employee.emp_no}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>
                <button className="btn" onClick={() => onEmployeeSelect(employee)}>
                  View
                </button>
                <button className="btn" onClick={() => onEmployeeEdit(employee)}>
                  Edit
                </button>

                <button
                  className="btn"
                  onClick={() => handleDeleteClick(employee.emp_no)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
