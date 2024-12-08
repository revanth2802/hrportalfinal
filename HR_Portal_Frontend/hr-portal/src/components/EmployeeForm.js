import React, { useState } from "react";
import EmployeeService from "../services/EmployeeService";
import "./EmployeeForm.css";

function EmployeeForm({ employee: initialEmployee = null }) {
  const [newEmployee, setNewEmployee] = useState({
    emp_no: initialEmployee ? initialEmployee.emp_no : "",
    birth_date: initialEmployee ? initialEmployee.birth_date : "",
    first_name: initialEmployee ? initialEmployee.first_name : "",
    last_name: initialEmployee ? initialEmployee.last_name : "",
    gender: initialEmployee ? initialEmployee.gender : "",
    hire_date: initialEmployee ? initialEmployee.hire_date : "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isEditing = !!initialEmployee;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddOrUpdateEmployee = (event) => {
    event.preventDefault();
    if (isEditing) {
      EmployeeService.updateEmployee(newEmployee.emp_no, newEmployee)
        .then((response) => {
          setFormSubmitted(true);
        })
        .catch((error) => {
         
        });
    } else {
      EmployeeService.addEmployee(newEmployee)
        .then((response) => {
          setFormSubmitted(true);
        })
        .catch((error) => {
        });
    }
  };

  if (formSubmitted) {
    return <div>Employee action was successful!</div>;
  }

  return (
    <div className="employee-form">
      <form onSubmit={handleAddOrUpdateEmployee}>
        <input
          type="text"
          name="emp_no"
          placeholder="Employee Number"
          value={newEmployee.emp_no}
          onChange={handleInputChange}
        />

        <label>
          Date of Birth
          <input
            type="date"
            name="birth_date"
            value={newEmployee.birth_date}
            onChange={handleInputChange}
          />
        </label>

        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={newEmployee.first_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={newEmployee.last_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender (M/F)"
          value={newEmployee.gender}
          onChange={handleInputChange}
        />

        <label>
          Hire Date
          <input
            type="date"
            name="hire_date"
            value={newEmployee.hire_date}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">
          {isEditing ? "Update Employee" : "Add Employee"}
        </button>
        {isEditing && (
          <button type="button" onClick={() => setNewEmployee(initialEmployee)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default EmployeeForm;
