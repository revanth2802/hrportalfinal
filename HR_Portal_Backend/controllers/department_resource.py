from flask_restful import Resource, reqparse
from sqlalchemy import or_
from sqlalchemy.sql import func
from models.department import Department
from models.department_employee import DepartmentEmployee  # Importing the model
from models.base import Session
from .utils import paginate_query
from flask import request


class DepartmentHandler(Resource):  # Renamed class for clarity

    # Define a parser for query parameters and payload
    argument_parser = reqparse.RequestParser(bundle_errors=True)
    argument_parser.add_argument('department_code', type=str, location='args',
                                 help="Department code is required")
    argument_parser.add_argument('page_number', type=int, location='args',
                                 default=1, help="Page number for pagination")
    argument_parser.add_argument('items_per_page', type=int, location='args',
                                 default=10, help="Number of items per page")
    argument_parser.add_argument('search_term', type=str, location='args',
                                 default='', help="Search term for department names")
    argument_parser.add_argument('include_employee_count', type=bool, location='args',
                                 default=False, help="Flag to include employee count per department")

    def get(self, department_code=None):
        """
        Retrieve departments or employees associated with a specific department.
        """
        # Check if the request is for employees within a department
        if department_code and "employees" in request.path:
            return self.fetch_employees_by_department(department_code)

        db_session = Session()
        try:
            args = self.argument_parser.parse_args()
            query = db_session.query(Department)

            # Filter by department code if provided
            if department_code:
                query = query.filter_by(dept_no=department_code)

            # Apply search term filter for department names
            if args['search_term']:
                search_filter = f"%{args['search_term']}%"
                query = query.filter(Department.dept_name.ilike(search_filter))

            # Include employee count if the flag is set
            if args['include_employee_count']:
                query = db_session.query(
                    Department.dept_no,
                    Department.dept_name,
                    func.count(DepartmentEmployee.emp_no).label('employee_count')
                ).join(
                    DepartmentEmployee, Department.dept_no == DepartmentEmployee.dept_no
                ).group_by(Department.dept_no, Department.dept_name)

                department_data = query.all()
                return {
                    "data": [{'department_code': dept[0], 'department_name': dept[1], 'employee_count': dept[2]} for dept in department_data]
                }

            # Paginate query results
            department_list, pagination_data = paginate_query(
                query, args['page_number'], args['items_per_page']
            )
            return {
                "data": [{'department_code': dept.dept_no, 'department_name': dept.dept_name} for dept in department_list],
                "pagination": pagination_data
            }

        except Exception as error:
            return {"error": f"An error occurred: {str(error)}"}, 500
        finally:
            db_session.close()

    def fetch_employees_by_department(self, department_code):
        """
        Fetch employees associated with a specific department.
        """
        db_session = Session()
        try:
            # Query the department based on the provided code
            department = db_session.query(Department).filter_by(
                dept_no=department_code).first()
            if not department:
                return {"message": "Department not found."}, 404

            # Access employees through ORM relationship
            employees = department.employees
            return {
                "data": [
                    {
                        "employee_id": emp.emp_no,
                        "start_date": emp.from_date.strftime('%Y-%m-%d'),
                        "end_date": emp.to_date.strftime('%Y-%m-%d')
                    } for emp in employees
                ]
            }

        except Exception as error:
            return {"error": f"An error occurred: {str(error)}"}, 500
        finally:
            db_session.close()

    def post(self):
        """
        Create a new department.
        """
        db_session = Session()
        data = self.argument_parser.parse_args()

        # Check for existing department by name or code
        existing_name = db_session.query(Department).filter_by(
            dept_name=data['department_name']).first()
        existing_code = db_session.query(Department).filter_by(
            dept_no=data['department_code']).first()

        if existing_name:
            return {"message": "A department with this name already exists."}, 400
        if existing_code:
            return {"message": "A department with this code already exists."}, 400

        # Create a new department record
        new_department = Department(
            dept_no=data['department_code'], dept_name=data['department_name'])
        try:
            db_session.add(new_department)
            db_session.commit()
            return {"message": "Department created successfully."}, 201
        except Exception as error:
            db_session.rollback()
            return {"error": f"An error occurred: {str(error)}"}, 500
        finally:
            db_session.close()

    def put(self, department_code):
        """
        Update an existing department's information.
        """
        db_session = Session()
        data = self.argument_parser.parse_args()

        department = db_session.query(Department).filter_by(
            dept_no=department_code).first()
        if department:
            department.dept_name = data['department_name']
            try:
                db_session.commit()
                return {"message": "Department updated successfully."}
            except Exception as error:
                db_session.rollback()
                return {"error": f"An error occurred: {str(error)}"}, 500
            finally:
                db_session.close()
        return {"message": "Department not found."}, 404

    def delete(self, department_code):
        """
        Delete a department based on the provided code.
        """
        db_session = Session()
        department = db_session.query(Department).filter_by(
            dept_no=department_code).first()
        if department:
            try:
                db_session.delete(department)
                db_session.commit()
                return {"message": "Department deleted successfully."}
            except Exception as error:
                db_session.rollback()
                return {"error": f"An error occurred: {str(error)}"}, 500
            finally:
                db_session.close()
        return {"message": "Department not found."}, 404