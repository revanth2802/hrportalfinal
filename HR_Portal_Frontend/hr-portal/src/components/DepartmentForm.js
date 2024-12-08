import React, { useState } from 'react';

function DepartmentForm({ onSave, department = {} }) {
  const [departmentName, setDepartmentName] = useState(department.name || '');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSave({ ...department, name: departmentName });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Department Name:
        <input
          type="text"
          value={departmentName}
          onChange={(event) => setDepartmentName(event.target.value)}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default DepartmentForm;
