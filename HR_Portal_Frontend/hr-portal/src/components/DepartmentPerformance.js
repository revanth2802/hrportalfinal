import React, { useState, useEffect } from "react";
import DepartmentDistributionChart from "./DepartmentDistributionChart";
import { useDashboardService } from "../services/DashboardService"; // Assuming this is the correct import path
import "./DepartmentPerformance.css";
function DepartmentPerformance() {
  const [departmentData, setDepartmentData] = useState([]);
  const [averageSalaries, setAverageSalaries] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);
  // Use the DashboardService hook
  const { fetchDepartmentDistributionData, fetchAverageSalaryPerDepartment } = useDashboardService(); // Assuming these functions are provided by the hook

  useEffect(() => {
    async function fetchData() {
      try {
        const deptDistribution = await fetchDepartmentDistributionData();
        setDepartmentData(deptDistribution);

        const avgSalaries = await fetchAverageSalaryPerDepartment();

        // Check if avgSalaries is an array before processing it
        if (Array.isArray(avgSalaries)) {
          setAverageSalaries(avgSalaries);
          // Compute the total salary and set the state
          const computedTotalSalary = avgSalaries.reduce(
            (acc, curr) => acc + curr.averageSalary,
            0
          );
          setTotalSalary(computedTotalSalary);
        } else {
          console.error("Unexpected data format for average salaries");
        }
      } catch (error) {
        console.error("Error fetching data for DepartmentPerformance:", error);
      }
    }
    fetchData();
  }, [fetchDepartmentDistributionData, fetchAverageSalaryPerDepartment]); // Add the functions to the dependencies array

  return (
    <div className="department-performance">
      <h2 className="department-performance-title">
        Department Performance Metrics
      </h2>
      <h3 className="department-total-salary">
        Total Salary Across All Departments: {totalSalary}
      </h3>{" "}
      {/* Displaying the total salary */}
      <h3 className="department-subtitle">Average Salaries per Department</h3>
      <div className="chart-container average-salaries-chart">
        <DepartmentDistributionChart
          data={averageSalaries}
          type="averageSalary"
        />
      </div>
      <h3 className="department-subtitle">Department Distribution</h3>
      <div className="chart-container distribution-chart">
        <DepartmentDistributionChart
          data={departmentData}
          type="distribution"
        />
      </div>
    </div>
  );
}

export default DepartmentPerformance;

