import React from 'react';
import '../styles/footer.css';

function Footer() {
    return (
        <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} TechCube Inc. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
