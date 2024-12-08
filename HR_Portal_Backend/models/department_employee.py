from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from .base import ORMBase  # Base class for ORM models

# Define the DepartmentEmployee model for ORM mapping
class EmployeeDepartment(ORMBase):  # Renamed class for better clarity
    __tablename__ = 'dept_emp'  # Maps to the 'dept_emp' table in the database

    # Define primary keys for the table
    employee_id = Column(Integer, ForeignKey('employees.emp_no'), primary_key=True)  # Employee ID (Foreign Key)
    department_id = Column(String, ForeignKey('departments.dept_no'), primary_key=True)  # Department ID (Foreign Key)
    start_date = Column(Date, primary_key=True)  # Start date of the association
    end_date = Column(Date)  # End date of the association