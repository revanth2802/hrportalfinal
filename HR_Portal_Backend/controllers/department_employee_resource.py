from flask_restful import Resource, reqparse
from models.department_employee import DepartmentEmployee
from models.base import Session
from .utils import paginate_query  # Utility function for pagination
from datetime import datetime
from flask import request

# Resource for managing Department-Employee relations
class DepartmentEmployeeHandler(Resource):  # Renamed class for clarity

    # Argument parser for query parameters
    arg_parser = reqparse.RequestParser(bundle_errors=True)
    arg_parser.add_argument('employee_id', type=int, location='args', help="Employee ID is required")
    arg_parser.add_argument('department_id', type=str, location='args', help="Department ID is required")
    arg_parser.add_argument(
        'start_date',
        type=lambda x: datetime.strptime(x, '%Y-%m-%d').date(),
        location='args',
        help="Start date must be in YYYY-MM-DD format"
    )
    arg_parser.add_argument(
        'end_date',
        type=lambda x: datetime.strptime(x, '%Y-%m-%d').date(),
        location='args',
        help="End date must be in YYYY-MM-DD format"
    )
    arg_parser.add_argument('page', type=int, location='args', default=1, help="Page number for pagination")
    arg_parser.add_argument('items_per_page', type=int, location='args', default=10, help="Number of items per page")

    def get(self, employee_id=None, department_id=None):
        """Fetch department-employee relations with optional filters."""
        db_session = Session()
        try:
            args = self.arg_parser.parse_args()
            query = db_session.query(DepartmentEmployee)

            if employee_id:
                query = query.filter_by(emp_no=employee_id)
            if department_id:
                query = query.filter_by(dept_no=department_id)

            results, pagination_info = paginate_query(query, args['page'], args['items_per_page'])

            # Format response data
            return {
                "data": [
                    {
                        'employee_id': record.emp_no,
                        'department_id': record.dept_no,
                        'start_date': str(record.from_date),
                        'end_date': str(record.to_date)
                    }
                    for record in results
                ],
                "pagination": pagination_info
            }
        except Exception as error:
            return {"error": str(error)}, 500
        finally:
            db_session.close()

    def post(self):
        """Create a new department-employee relation."""
        db_session = Session()
        data = request.get_json()

        # Check for existing relation
        existing_relation = db_session.query(DepartmentEmployee).filter_by(
            emp_no=data['employee_id'], dept_no=data['department_id'], from_date=data['start_date']
        ).first()

        if existing_relation:
            return {"message": "This relation already exists."}, 400

        new_relation = DepartmentEmployee(
            emp_no=data['employee_id'], dept_no=data['department_id'], from_date=data['start_date'], to_date=data['end_date']
        )

        try:
            db_session.add(new_relation)
            db_session.commit()
            return {"message": "Relation created successfully."}, 201
        except Exception as error:
            db_session.rollback()
            return {"error": str(error)}, 500
        finally:
            db_session.close()

    def put(self, employee_id, department_id, start_date):
        """Update an existing department-employee relation."""
        db_session = Session()
        data = request.get_json()

        relation = db_session.query(DepartmentEmployee).filter_by(
            emp_no=employee_id, dept_no=department_id, from_date=start_date
        ).first()

        if relation:
            relation.dept_no = data['department_id']
            relation.to_date = data['end_date']
            try:
                db_session.commit()
                return {"message": "Relation updated successfully."}
            except Exception as error:
                db_session.rollback()
                return {"error": str(error)}, 500
            finally:
                db_session.close()

        return {"message": "Relation not found."}, 404

    def delete(self, employee_id, department_id, start_date):
        """Delete an existing department-employee relation."""
        db_session = Session()
        relation = db_session.query(DepartmentEmployee).filter_by(
            emp_no=employee_id, dept_no=department_id, from_date=start_date
        ).first()

        if relation:
            try:
                db_session.delete(relation)
                db_session.commit()
                return {"message": "Relation deleted successfully."}
            except Exception as error:
                db_session.rollback()
                return {"error": str(error)}, 500
            finally:
                db_session.close()

        return {"message": "Relation not found."}, 404