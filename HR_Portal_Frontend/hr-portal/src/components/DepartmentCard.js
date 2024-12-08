import React from "react";

function DepartmentCard({ dept }) {
  return (
    <div className="department-card">
      <h3>{dept.dept_name}</h3>
      <p>Employees in Department: {dept.employee_count}</p>
    </div>
  );
}

export default DepartmentCard;
