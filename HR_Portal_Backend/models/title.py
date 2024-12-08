from sqlalchemy import Column, Integer, String, Date, ForeignKey
from .base import ORMBase  # Base ORM model

# Define the JobTitle model for ORM mapping
class JobTitle(ORMBase):  # Renamed class for better clarity
    __tablename__ = 'titles'  # Maps to the 'titles' table in the database

    # Columns for the titles table
    employee_id = Column(Integer, ForeignKey('employees.emp_no'), primary_key=True)  # Employee ID (Foreign Key)
    position_title = Column(String)  # Title of the employee's position
    start_date = Column(Date, primary_key=True)  # Start date of the title
    end_date = Column(Date)  # End date of the title (nullable for current positions)