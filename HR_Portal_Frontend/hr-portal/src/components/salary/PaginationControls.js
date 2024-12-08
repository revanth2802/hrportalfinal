import React from 'react';

function PaginationControls({ currentPage, totalPages, onPageChange }) {
    console.log("Total Pages:", totalPages);
    console.log("Received Total Pages:", totalPages);
    const prevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    const nextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div>
            <button onClick={prevPage}>Previous</button>
            | Page {currentPage} of {totalPages} |
            <button onClick={nextPage}>Next</button>
        </div>
    );
}

export default PaginationControls;

