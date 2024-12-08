from sqlalchemy import create_engine, Column, Integer, Date
from models.base import ORMBase  # Import the base ORM model

# Define the LatestEmployeeDepartmentDate model
class LatestDeptEmpDate(ORMBase):  # Renamed class for better clarity
    __tablename__ = 'dept_emp_latest_date'  # Corresponds to the 'dept_emp_latest_date' table

    # Primary key: Employee ID
    employee_id = Column(Integer, primary_key=True)  # Unique identifier for the employee

    # Start date of the department association
    start_date = Column(Date)  # Date the employee joined the department

    # End date of the department association
    end_date = Column(Date)  # Date the employee left the department