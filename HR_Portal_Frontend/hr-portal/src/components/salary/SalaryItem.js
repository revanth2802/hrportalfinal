function SalaryItem({ salary = { emp_no: 'N/A', salary: 'N/A', from_date: 'N/A', to_date: 'N/A' }, onEdit, onDelete }) {
    console.log("Salary Data for Item:", salary);
    return (
        <div>
            <p>Employee Number: {salary.emp_no}</p>
            <p>Salary: {salary.salary}</p>
            <p>From: {salary.from_date}</p>
            <p>To: {salary.to_date}</p>
            <button onClick={() => onEdit(salary)}>Edit</button>
            <button onClick={() => onDelete(salary.emp_no)}>Delete</button>
        </div>
    );
}

export default SalaryItem;
