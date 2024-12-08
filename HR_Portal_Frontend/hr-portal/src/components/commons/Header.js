import React from 'react';
import '../styles/header.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton } from '../AuthButtons';

function Header() {
    const { isAuthenticated, isLoading } = useAuth0();

    return (
        <header className="app-header">
            <h1 className="header-title">
                <Link to="/">TechCube</Link>
            </h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    isAuthenticated ? <LogoutButton /> : <LoginButton />
                )}
            </nav>
        </header>
    );
}

export default Header;
