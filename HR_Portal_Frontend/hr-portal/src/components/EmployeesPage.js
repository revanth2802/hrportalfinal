
import React, { useState, useEffect, useCallback } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import EmployeeService from "../services/EmployeeService"; // Adjust the path as necessary
import SearchBar from "./SearchBar";
import EmployeeTable from "./EmployeeTable";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeForm from "./EmployeeForm";
import "./EmployeesPage.css";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await EmployeeService.fetchEmployees(currentPage, searchQuery);
      
      setEmployees(response.data.data); 
      setMaxPages(response.data.pagination.total_pages);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, [searchQuery, currentPage]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "prev" && prev > 1) {
        return prev - 1;
      } else if (direction === "next" && prev < maxPages) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const deleteEmployee = async (empNo) => {
    try {
      await EmployeeService.deleteEmployee(empNo);
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.emp_no !== empNo));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
    setShowForm(true);
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />
      <div>
        <button className="new-employee-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Employee'}
        </button>
      </div>
      {showForm && (
        <EmployeeForm
          employee={employeeToEdit}
          onSave={() => {
            setShowForm(false);
            fetchEmployees(); // Refresh the list after saving
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
      <EmployeeTable
        employees={employees}
        onSelectEmployee={setSelectedEmployee}
        onDeleteEmployee={deleteEmployee}
        onEditEmployee={handleEditEmployee}
      />
      {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
      <div className="pagination-controls">
        <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {maxPages}
        </span>
        <button onClick={() => handlePageChange("next")} disabled={currentPage === maxPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(EmployeesPage, {
  onRedirecting: () => <div>Loading...</div>,
});

