from flask_restful import Resource, reqparse
from sqlalchemy import or_
from models.base import Session
from models.employee import Employee
from models.department_manager import DepartmentManager
from models.department_employee import DepartmentEmployee
from .utils import paginate_query
from flask import request, jsonify, current_app as app
from datetime import datetime

# Utility function to ensure positive integers for page parameters
def ensure_positive_int(value):
    if not value:
        return 1
    try:
        parsed_value = int(value)
        if parsed_value < 1:
            raise ValueError
        return parsed_value
    except ValueError:
        raise ValueError("The 'page' parameter must be a positive integer.")

# Resource to manage Employee operations
class EmployeeHandler(Resource):  # Renamed for clarity

    # Argument parser for query parameters
    query_parser = reqparse.RequestParser(bundle_errors=True)
    query_parser.add_argument('employee_id', type=int, location='args', help="Employee ID is required")
    query_parser.add_argument('page', type=ensure_positive_int, location='args', default=1, help="Pagination page number")
    query_parser.add_argument('items_per_page', type=int, location='args', default=10, help="Number of items per page")
    query_parser.add_argument('search_term', type=str, location='args', default='', help="Search term for employees")

    def get(self, employee_id=None):
        """
        Retrieve employees with optional filtering, pagination, and search.
        """
        with Session() as db_session:
            manager_details = None
            try:
                # Parse query arguments
                args = self.query_parser.parse_args()
                query = db_session.query(Employee)

                # Filter by employee ID if provided
                if employee_id:
                    query = query.filter_by(emp_no=employee_id)
                    manager_details = self.fetch_manager(employee_id, db_session)

                # Apply search term to filter by employee names
                if args['search_term']:
                    search_pattern = f"%{args['search_term']}%"
                    query = query.filter(or_(
                        Employee.first_name.ilike(search_pattern),
                        Employee.last_name.ilike(search_pattern)
                    ))

                # Filter employees hired after a specific date
                hired_after_date = request.args.get('hired_after')
                if hired_after_date:
                    try:
                        parsed_date = datetime.strptime(hired_after_date, '%Y-%m-%d').date()
                        query = query.filter(Employee.hire_date > parsed_date)
                    except ValueError:
                        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

                # Paginate results
                employees, pagination_data = paginate_query(query, args['page'], args['items_per_page'])

                # Format and return response
                return jsonify({
                    "employees": [emp.to_dict() for emp in employees],
                    "pagination": pagination_data,
                    "manager_details": manager_details
                })
            except Exception as error:
                app.logger.error("Error in EmployeeHandler GET: %s", error, exc_info=True)
                return jsonify({"error": str(error)}), 500

    def fetch_manager(self, employee_id, db_session):
        """
        Fetch details of the manager for a specific employee.
        """
        manager_query = db_session.query(Employee).join(
            DepartmentManager, Employee.emp_no == DepartmentManager.emp_no
        ).join(
            DepartmentEmployee, DepartmentManager.dept_no == DepartmentEmployee.dept_no
        ).filter(
            DepartmentEmployee.emp_no == employee_id,
            DepartmentManager.to_date == '9999-01-01'
        ).first()

        if manager_query:
            return {
                "employee_id": manager_query.emp_no,
                "first_name": manager_query.first_name,
                "last_name": manager_query.last_name
            }
        return None

    def post(self):
        """
        Create a new employee record.
        """
        with Session() as db_session:
            data = request.get_json()
            new_employee = Employee(
                emp_no=data.get('employee_id'),
                birth_date=data.get('birth_date'),
                first_name=data.get('first_name'),
                last_name=data.get('last_name'),
                gender=data.get('gender'),
                hire_date=data.get('hire_date')
            )
            try:
                db_session.add(new_employee)
                db_session.commit()
                return {"message": "Employee added successfully."}, 201
            except Exception as error:
                db_session.rollback()
                app.logger.error("Error in EmployeeHandler POST: %s", error, exc_info=True)
                return {"error": str(error)}, 500

    def put(self, employee_id):
        """
        Update an existing employee's details.
        """
        with Session() as db_session:
            data = request.get_json()
            employee = db_session.query(Employee).filter_by(emp_no=employee_id).first()

            if not employee:
                return {"message": "Employee not found."}, 404

            # Update fields with provided data
            employee.birth_date = data.get('birth_date', employee.birth_date)
            employee.first_name = data.get('first_name', employee.first_name)
            employee.last_name = data.get('last_name', employee.last_name)
            employee.gender = data.get('gender', employee.gender)
            employee.hire_date = data.get('hire_date', employee.hire_date)

            try:
                db_session.commit()
                return {"message": "Employee details updated successfully."}
            except Exception as error:
                db_session.rollback()
                app.logger.error("Error in EmployeeHandler PUT: %s", error, exc_info=True)
                return {"error": str(error)}, 500

    def delete(self, employee_id):
        """
        Delete an employee record.
        """
        with Session() as db_session:
            employee = db_session.query(Employee).filter_by(emp_no=employee_id).first()

            if not employee:
                return {"message": "Employee not found."}, 404

            try:
                db_session.delete(employee)
                db_session.commit()
                return {"message": "Employee deleted successfully."}
            except Exception as error:
                db_session.rollback()
                app.logger.error("Error in EmployeeHandler DELETE: %s", error, exc_info=True)
                return {"error": str(error)}, 500