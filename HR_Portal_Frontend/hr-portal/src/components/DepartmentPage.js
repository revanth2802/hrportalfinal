import React from 'react';
import './DepartmentPage.css';
import DepartmentOverview from './DepartmentOverview';
import EmployeeBreakdown from './EmployeeBreakdown';
import DepartmentPerformance from './DepartmentPerformance';

function DepartmentPage() {
    return (
        <div className="department-page">
            <h1>Departments</h1>
            <DepartmentOverview />
            <EmployeeBreakdown />
            <DepartmentPerformance />
        </div>
    );
}

export default DepartmentPage;
