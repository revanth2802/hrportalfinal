import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDashboardService } from "../services/DashboardService";
import SalaryGrowthComponent from "./SalaryGrowthComponent";
import DepartmentDistributionChart from "./DepartmentDistributionChart";
import GenderDistributionChart from "./GenderDistributionChart";
import "./Dashboard.css";

function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    averageSalary: 0.0,
    recentHires: 0,
    departmentDistribution: [],
    genderDistribution: {},
  });

  const { fetchDashboardMetrics } = useDashboardService();

  useEffect(() => {
    const retrieveMetrics = async () => {
      try {
        const data = await fetchDashboardMetrics();
        console.debug("Metrics fetched:", data);
        setMetrics(data);
      } catch (err) {
        console.error("Failed to fetch metrics:", err);
      }
    };

    retrieveMetrics();
  }, [fetchDashboardMetrics]);

  return (
    <div className="dashboard-container">
      <div className="common-width-container">
        <h1>TechCube Analytics</h1>
        <nav className="navigation-links">
          <Link to="/employees">Employees</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/salaries">Salaries</Link>
          <Link to="/titles">Titles</Link>
        </nav>

        <section className="dashboard-metrics">
          <p>Total Employees: {metrics.totalEmployees}</p>
          <p>Total Departments: {metrics.totalDepartments}</p>
          <p>Average Salary: ${metrics.averageSalary.toFixed(2)}</p>
          <p>Recent Hires (Last 5 years): {metrics.recentHires}</p>
        </section>
      </div>
      <div className="common-width-container dashboard-charts">
        <article className="chart-section">
          <h3>Department Distribution</h3>
          <DepartmentDistributionChart
            distributionData={metrics.departmentDistribution}
          />
        </article>
        <article className="chart-section">
          <h3>Gender Distribution</h3>
          <GenderDistributionChart genderData={metrics.genderDistribution} />
        </article>
      </div>
    </div>
  );
}

export default Dashboard;
