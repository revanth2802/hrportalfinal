import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./HomePage.css";
import topImage from "../assets/logo.png"; // Replace with your image path

function HomePage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  // Handles login logic and redirects based on authentication state
  const handleLogin = () => {
    if (isAuthenticated) {
      // If already logged in, navigate to the dashboard
      window.location.href = "/dashboard";
    } else {
      // If not authenticated, redirect to the login page
      loginWithRedirect({
        appState: { returnTo: "/dashboard" },
      });
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to TechCube HR Portal</h1>
        <p>Your one-stop solution for HR management</p>
        <img src={topImage} alt="TechCube HR Portal" className="top-image" />
      </header>

      {/* Image Gallery Section */}
      <section className="image-gallery-section">
        <h2>Explore Our Features</h2>
        <div className="image-gallery">
          <div className="image-box">
            <img src={require("../assets/image1.png")} alt="Feature 1" />
          </div>
          <div className="image-box">
            <img src={require("../assets/image2.png")} alt="Feature 2" />
          </div>
          <div className="image-box">
            <img src={require("../assets/image3.avif")} alt="Feature 3" />
          </div>
          <div className="image-box">
            <img src={require("../assets/image4.png")} alt="Feature 4" />
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="sections">
        <div className="section">
          <h2>Streamline HR Processes</h2>
          <p>
            Effortlessly manage employee data, payroll, and departmental
            operations in one unified platform. Save time and boost efficiency
            across your HR workflows.
          </p>
          <button onClick={handleLogin} className="action-button">
            Get Started
          </button>
        </div>

        <div className="section">
          <h2>Empower Your Team</h2>
          <p>
            Foster a productive work environment with real-time insights,
            performance analytics, and team collaboration tools designed for
            modern workplaces.
          </p>
          <button onClick={handleLogin} className="action-button">
            Learn More
          </button>
        </div>

        <div className="section">
          <h2>Secure and Scalable</h2>
          <p>
            Built on robust technology, TechCube ensures data security while
            scaling seamlessly with your growing organization's needs.
          </p>
          <button onClick={handleLogin} className="action-button">
            Explore Features
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
