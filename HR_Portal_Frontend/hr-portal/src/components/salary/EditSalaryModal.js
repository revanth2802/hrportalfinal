import React, { useState } from 'react';
import SalariesService from '../../services/SalariesService';
import './AddSalaryForm.css';

function EditSalaryModal({ salary, onUpdated, onClose }) {
    const [formData, setFormData] = useState({
        emp_no: salary.emp_no,
        salary: salary.salary,
        from_date: salary.from_date,
        to_date: salary.to_date
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        SalariesService.updateSalary(formData.emp_no, formData)
            .then(response => {
                console.log("Salary updated successfully:", response);
                onUpdated(); 
            })
            .catch(error => {
                console.error("Error updating salary:", error);
            });
    };

    return (
        <div className="edit-salary-modal">
            <h3>Edit Salary</h3>
            <form onSubmit={handleSubmit} className="edit-salary-form">
                <div className="input-group">
                    <label>Employee Number: </label>
                    <input type="text" name="emp_no" value={formData.emp_no} onChange={handleInputChange} disabled />
                </div>
                <div className="input-group">
                    <label>Salary: </label>
                    <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                    <label>From Date: </label>
                    <input type="date" name="from_date" value={formData.from_date} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                    <label>To Date: </label>
                    <input type="date" name="to_date" value={formData.to_date} onChange={handleInputChange} />
                </div>
                <button type="submit" style={{ marginBottom: '10px' }}>Update Salary</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );  
}

export default EditSalaryModal;
