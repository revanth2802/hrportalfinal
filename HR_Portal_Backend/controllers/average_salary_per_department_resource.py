from flask_restful import Resource
from models.base import Session
from models.department import Department
from models.department_employee import DepartmentEmployee as DepartmentEmp
from models.salary import Salary
from sqlalchemy import func


# Define resource for average salary calculation per department
class DeptAvgSalaryResource(Resource):  # Renamed class for clarity
    def get(self):
        # Initialize database session
        db_session = Session()
        try:
            # Query to calculate the average salary per department
            avg_salary_query = (
                db_session.query(
                    Department.dept_name,  # Select department name
                    func.avg(Salary.salary).label('avg_salary')  # Calculate average salary
                )
                .join(DepartmentEmp, DepartmentEmp.dept_no == Department.dept_no)  # Join with DepartmentEmployee table
                .join(Salary, Salary.emp_no == DepartmentEmp.emp_no)  # Join with Salary table
                .group_by(Department.dept_name)  # Group results by department name
                .all()  # Execute query
            )

            # Prepare and return the result as a JSON response
            return {
                "data": [
                    {"dept_name": row[0], "avg_salary": float(row[1])} for row in avg_salary_query
                ]
            }

        except Exception as error:
            # Log the error for debugging purposes
            print(f"Error occurred: {error}")
            return {"error": "An unexpected error occurred. Please try again later."}, 500
        finally:
            # Ensure the database session is closed
            db_session.close()