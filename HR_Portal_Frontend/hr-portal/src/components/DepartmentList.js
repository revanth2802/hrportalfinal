import React from "react";

function DepartmentList({ departments, onSelectDepartment }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Department Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {departments.map(department => {
          return (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>
                <button onClick={() => onSelectDepartment(department.id)}>
                  View Employees
                </button>
                {/* Additional actions can be added here */}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DepartmentList;
