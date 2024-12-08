import React from 'react';
import SalaryItem from './SalaryItem';
import './SalaryList.css';

function SalaryList({ salaries, onEdit, onDelete }) {
    return (
        <div className="salary-list">
            {salaries.map((salary, index) => 
                <SalaryItem 
                    key={`${salary.emp_no}-${index}`} 
                    salary={salary}
                    onEdit={onEdit} // Passing down the onEdit function
                    onDelete={onDelete}
                />
            )}
        </div>
    );
}



export default SalaryList;
