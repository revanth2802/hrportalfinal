from sqlalchemy import Column, Integer, String, Date
from models.base import ORMBase  # Import base class for ORM models

# Define the CurrentDepartmentEmployee model
class DepartmentEmployee(ORMBase):  # Renamed class for better clarity
    __tablename__ = 'current_dept_emp'  # Maps to the 'current_dept_emp' table

    # Define columns for the table
    employee_id = Column(Integer, primary_key=True)  # Employee number
    department_id = Column(String(4), primary_key=True)  # Department number
    start_date = Column(Date)  # Start date of association with department
    end_date = Column(Date)  # End date of association with department