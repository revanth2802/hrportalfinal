

import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Dashboard from "./components/Dashboard";
import Header from "./components/commons/Header";
import Footer from "./components/commons/Footer";
import EmployeeForm from "./components/EmployeeForm";
import DepartmentPage from "./components/DepartmentPage";
import DepartmentOverview from "./components/DepartmentOverview";
import Salaries from "./components/salary/Salaries";
import EmployeesPage from "./components/EmployeesPage";
import HomePage from "./components/HomePage";
import TitlesPage from "./components/title/TitlesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import About from './components/About';
import Contact from './components/Contact';
import DocumentsPage from './components/documents/DocumentsPage';
import SideBar from "./components/commons/SideBar";

// Import styles
import "./App.css";

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      redirectUri={`${window.location.origin}/callback`}

    >
      <Router>
        <div className="app-container">
          <Header />
          <div className="content-area">
            <SideBar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/employees" element={<ProtectedRoute><EmployeesPage /></ProtectedRoute>} />
                <Route path="/salaries" element={<ProtectedRoute><Salaries /></ProtectedRoute>} />
                <Route path="/departments" element={<ProtectedRoute><DepartmentPage /></ProtectedRoute>} />
                <Route path="/employees/add" element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>} />
                <Route path="/employees/edit/:empNo" element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>} />
                <Route path="/titles" element={<ProtectedRoute><TitlesPage /></ProtectedRoute>} />
                <Route path="/departments/:deptNo" element={<ProtectedRoute><DepartmentOverview /></ProtectedRoute>} />
                <Route path="/documents" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;
