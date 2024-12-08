from flask_restful import Resource, reqparse
from models.salary import Salary
from models.base import Session
from .utils import paginate_query  # Utility for pagination
from models.employee import Employee
from sqlalchemy import or_, cast, String
from sqlalchemy.exc import IntegrityError
from flask import request

# Resource to handle salary-related operations
class EmployeeSalariesHandler(Resource):  # Renamed class for clarity

    # Argument parser for handling query parameters
    query_parser = reqparse.RequestParser(bundle_errors=True)
    query_parser.add_argument('employee_id', type=int, location='args', help="Employee ID is required")
    query_parser.add_argument('page_number', type=int, location='args', default=1, help="Page number for pagination")
    query_parser.add_argument('items_per_page', type=int, location='args', default=10, help="Number of items per page")
    query_parser.add_argument('search_query', type=str, location='args', default="", help="Search query for employee name or number")

    def get(self, employee_id=None, start_date=None):
        """
        Retrieve salaries with optional filtering, pagination, and search.
        """
        db_session = Session()

        try:
            # Parse arguments from the request
            args = self.query_parser.parse_args()

            # Base query for the Salary model
            salary_query = db_session.query(Salary)

            # Apply employee ID filter if provided
            if employee_id:
                salary_query = salary_query.filter_by(emp_no=employee_id)

            # Apply start date filter if provided
            if start_date:
                salary_query = salary_query.filter_by(from_date=start_date)

            # Apply search query filter
            search_query = args["search_query"]
            if search_query:
                salary_query = salary_query.join(Employee).filter(
                    or_(
                        Employee.first_name.ilike(f"%{search_query}%"),
                        Employee.last_name.ilike(f"%{search_query}%"),
                        cast(Employee.emp_no, String) == search_query
                    )
                )

            # Paginate the query results
            salaries, pagination_info = paginate_query(salary_query, args['page_number'], args['items_per_page'])

            # If no results found, return an empty response
            if not salaries:
                return {"data": [], "pagination": pagination_info}

            # Format the query results into a response
            response_data = [
                {
                    "employee_id": salary.emp_no,
                    "salary": salary.salary,
                    "start_date": str(salary.from_date),
                    "end_date": str(salary.to_date),
                }
                for salary in salaries
            ]

            return {"data": response_data, "pagination": pagination_info}

        except IntegrityError:
            return {"error": "A database integrity constraint was violated."}, 500
        except Exception as error:
            return {"error": f"An internal error occurred: {str(error)}"}, 500
        finally:
            # Ensure the session is closed
            db_session.close()

    def post(self):
        """
        Add a new salary record for an employee.
        """
        db_session = Session()
        try:
            # Extract data from the request
            data = request.json

            # Create a new Salary object
            new_salary = Salary(
                emp_no=data['employee_id'],
                salary=data['salary'],
                from_date=data['start_date'],
                to_date=data['end_date']
            )

            # Add and commit the new salary to the database
            db_session.add(new_salary)
            db_session.commit()
            return {"message": "Salary record added successfully."}, 201

        except Exception as error:
            db_session.rollback()
            return {"error": f"Failed to add salary record: {str(error)}"}, 500
        finally:
            db_session.close()

    def put(self, employee_id):
        """
        Update an existing salary record for an employee.
        """
        db_session = Session()
        try:
            # Extract data from the request
            data = request.json

            # Retrieve the existing salary record
            salary_record = db_session.query(Salary).filter_by(emp_no=employee_id).first()
            if not salary_record:
                return {"message": "Salary record not found for the provided employee ID."}, 404

            # Update fields with new values
            salary_record.salary = data['salary']
            salary_record.from_date = data['start_date']
            salary_record.to_date = data['end_date']

            # Commit the changes
            db_session.commit()
            return {"message": "Salary record updated successfully."}

        except Exception as error:
            db_session.rollback()
            return {"error": f"Failed to update salary record: {str(error)}"}, 500
        finally:
            db_session.close()

    def delete(self, employee_id):
        """
        Delete a salary record for an employee.
        """
        db_session = Session()
        try:
            # Retrieve the existing salary record
            salary_record = db_session.query(Salary).filter_by(emp_no=employee_id).first()
            if not salary_record:
                return {"message": "Salary record not found for the provided employee ID."}, 404

            # Delete the record and commit the changes
            db_session.delete(salary_record)
            db_session.commit()
            return {"message": "Salary record deleted successfully."}

        except Exception as error:
            db_session.rollback()
            return {"error": f"Failed to delete salary record: {str(error)}"}, 500
        finally:
            db_session.close()