from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from .base import ORMBase  # Base ORM model
from .title import EmployeeTitle  # Related table for titles
from .salary import EmployeeSalary  # Related table for salaries

# Define the Employee model for ORM
class Personnel(ORMBase):  # Renamed class for better clarity
    __tablename__ = 'employees'  # Maps to the 'employees' table in the database

    # Columns for the employee table
    employee_id = Column(Integer, primary_key=True)  # Unique identifier for the employee
    date_of_birth = Column(Date)  # Date of birth of the employee
    first_name = Column(String)  # Employee's first name
    last_name = Column(String)  # Employee's last name
    gender = Column(String)  # Employee's gender
    start_date = Column(Date)  # Hire date of the employee

    # Relationships with other tables
    job_titles = relationship('EmployeeTitle', backref='personnel')  # Links to the titles table
    pay_records = relationship('EmployeeSalary', backref='personnel')  # Links to the salaries table

    # Convert the employee instance to a dictionary for serialization
    def as_dict(self):  # Renamed from `to_dict`
        return {
            'employee_id': self.employee_id,
            'date_of_birth': str(self.date_of_birth),
            'first_name': self.first_name,
            'last_name': self.last_name,
            'gender': self.gender,
            'start_date': str(self.start_date),
            # Uncomment the lines below to include related titles and salaries
            # 'job_titles': [title.as_dict() for title in self.job_titles],
            # 'pay_records': [salary.as_dict() for salary in self.pay_records],
        }