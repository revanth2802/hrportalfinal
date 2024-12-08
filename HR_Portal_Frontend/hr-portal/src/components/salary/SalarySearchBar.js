 import React, { useState } from 'react';

// SalarySearchBar.js
function SalarySearchBar({ onSearch }) {
    const [term, setTerm] = useState('');
    const handleSearch = () => {
        onSearch(term);
    };

    return (
        <div>
            <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search by Employee Name or Number" />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SalarySearchBar;
