import React, { useState, useEffect } from 'react';
import SalarySearchBar from './SalarySearchBar';
import SalaryList from './SalaryList'; 
import PaginationControls from './PaginationControls';
import AddSalaryForm from './AddSalaryForm';
import EditSalaryModal from './EditSalaryModal';
import SalariesService from '../../services/SalariesService';
import './Salaries.css';

function Salaries() {
    const [salaries, setSalaries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingSalary, setEditingSalary] = useState(null);

    useEffect(() => {
        
        SalariesService.fetchSalaries(currentPage, searchTerm)
            .then(response => {
                console.log("Fetched salaries:", response);
                console.log("First salary item:", response.data[0]);

                setSalaries(response.data);
                //setTotalPages(response.pagination.totalPages);
                setTotalPages(response.pagination.total_pages);

            })
            .catch(error => {
                console.error("Error fetching salaries:", error);
            });
    }, [currentPage, searchTerm]);
    

    const handleSalaryUpdated = () => {
        SalariesService.fetchSalaries(currentPage, searchTerm)
            .then(response => {
                setSalaries(response.data);
                setTotalPages(response.pagination.total_pages);
            })
            .catch(error => {
                console.error("Error fetching salaries:", error);
            });
        setEditingSalary(null);
    };

    const handleEdit = (salary) => {
        setEditingSalary(salary);
    };

    const handleDelete = (emp_no) => {
        SalariesService.deleteSalary(emp_no)
            .then(() => {
                SalariesService.fetchSalaries(currentPage, searchTerm)
                    .then(response => {
                        setSalaries(response.data);
                        setTotalPages(response.pagination.total_pages);
                    })
                    .catch(error => {
                        console.error("Error fetching salaries after delete:", error);
                    });
            })
            .catch(error => {
                console.error("Error deleting salary:", error);
            });
    };
    return (
        <div className="salaries-container">
            <SalarySearchBar onSearch={setSearchTerm} />
            <SalaryList salaries={salaries} onEdit={handleEdit} onDelete={handleDelete} />
            <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <AddSalaryForm />
            {editingSalary && <EditSalaryModal salary={editingSalary} onUpdated={handleSalaryUpdated} />}
        </div>
    );
}

export default Salaries;
