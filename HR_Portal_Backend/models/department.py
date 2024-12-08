from sqlalchemy import create_engine, Column, String
from sqlalchemy.orm import relationship
from .base import ORMBase  # Base class for ORM models
from .department_employee import EmployeeDepartment  # Import association table for employees
from .department_manager import ManagerAssignment  # Import association table for managers

# Define the Department model
class OrganizationDepartment(ORMBase):  # Renamed class for clarity
    __tablename__ = 'departments'  # Maps to the 'departments' table in the database

    # Primary key for the department
    department_id = Column(String, primary_key=True)  # Unique identifier for the department

    # Name of the department
    department_name = Column(String)  # Descriptive name of the department

    # Relationships for ORM navigation
    employee_associations = relationship('EmployeeDepartment', backref='department')  # Links to employees
    manager_associations = relationship('ManagerAssignment', backref='department')  # Links to managers