import React, { useState } from 'react';
import SalariesService from '../../services/SalariesService';
import './AddSalaryForm.css';

function AddSalaryForm() {
    const [formFields, setFormFields] = useState({
        emp_no: '',
        salary: '',
        from_date: '',
        to_date: ''
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        SalariesService.addSalary(formFields)
            .then(response => {
                console.log("Salary successfully added:", response);
                // TODO: Handle success (e.g., reset form, show success message)
            })
            .catch(err => {
                console.error("Failed to add salary:", err);
                // TODO: Handle error (e.g., show error message)
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormFields(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleFormSubmit} className="add-salary-form">
            <div className="input-group">
                <label htmlFor="emp_no">Employee Number:</label>
                <input 
                    type="number" 
                    id="emp_no"
                    name="emp_no" 
                    value={formFields.emp_no} 
                    onChange={handleInputChange} 
                    required 
                />
            </div>
            <div className="input-group">
                <label htmlFor="salary">Salary:</label>
                <input 
                    type="number" 
                    id="salary"
                    name="salary" 
                    value={formFields.salary} 
                    onChange={handleInputChange} 
                    required 
                />
            </div>
            <div className="input-group">
                <label htmlFor="from_date">From Date:</label>
                <input 
                    type="date" 
                    id="from_date"
                    name="from_date" 
                    value={formFields.from_date} 
                    onChange={handleInputChange} 
                    required 
                />
            </div>
            <div className="input-group">
                <label htmlFor="to_date">To Date:</label>
                <input 
                    type="date" 
                    id="to_date"
                    name="to_date" 
                    value={formFields.to_date} 
                    onChange={handleInputChange} 
                    required 
                />
            </div>
            <button type="submit">Add Salary</button>
        </form>
    );
}

export default AddSalaryForm;
