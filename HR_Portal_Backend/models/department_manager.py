from sqlalchemy import Column, Integer, String, Date, ForeignKey
from .base import ORMBase  # Base class for ORM mapping

# Define the DepartmentManager model
class ManagerAssignment(ORMBase):  # Renamed class for clarity
    __tablename__ = 'dept_manager'  # Corresponds to the 'dept_manager' table in the database

    # Define the columns and primary keys
    manager_id = Column(Integer, ForeignKey('employees.emp_no'), primary_key=True)  # Manager ID (FK)
    department_id = Column(String, ForeignKey('departments.dept_no'), primary_key=True)  # Department ID (FK)
    start_date = Column(Date, primary_key=True)  # Start date of the manager's assignment
    end_date = Column(Date)  # End date of the manager's assignment