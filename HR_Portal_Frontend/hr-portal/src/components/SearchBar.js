import React from 'react';

function SearchBar({ onSearch }) {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search employees..."
                onChange={event => onSearch(event.target.value)}
            />
        </div>
    );
}

export default SearchBar;
