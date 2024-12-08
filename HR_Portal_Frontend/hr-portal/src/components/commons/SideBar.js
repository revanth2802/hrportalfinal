import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/SideBar.css';

const SideBar = () => {
  return (
    <aside className="sidebar">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/dashboard" activeClassName="active-link">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/employees" activeClassName="active-link">
              Employees
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/departments" activeClassName="active-link">
              Departments
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/salaries" activeClassName="active-link">
              Salaries
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/titles" activeClassName="active-link">
              Titles
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to="/documents" activeClassName="active-link">
              Documents
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
