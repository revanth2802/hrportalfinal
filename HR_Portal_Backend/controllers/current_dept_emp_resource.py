from datetime import datetime
from flask_restful import Resource, reqparse
from models.base import Session
from models.current_dept_emp import CurrentDeptEmp
from .utils import paginate_query  # Custom utility function for pagination

# Resource for fetching current department employees
class ActiveDepartmentResource(Resource):  # Renamed class for clarity

    # Request parser to handle query parameters
    request_parser = reqparse.RequestParser(bundle_errors=True)
    request_parser.add_argument('employee_id', type=int, location='args', help="Employee ID is required")
    request_parser.add_argument('department_id', type=str, location='args', help="Department ID is required")
    request_parser.add_argument(
        'start_date',
        type=lambda x: datetime.strptime(x, '%Y-%m-%d').date(),
        location='args',
        help="Start date is required in YYYY-MM-DD format"
    )
    request_parser.add_argument(
        'end_date',
        type=lambda x: datetime.strptime(x, '%Y-%m-%d').date(),
        location='args',
        help="End date is required in YYYY-MM-DD format"
    )
    request_parser.add_argument('page', type=int, location='args', default=1, help="Page number for pagination")
    request_parser.add_argument('items_per_page', type=int, location='args', default=10, help="Number of items per page")

    def get(self, employee_id=None):
        # Initialize database session
        db_session = Session()
        try:
            # Parse the incoming query parameters
            parsed_args = self.request_parser.parse_args()

            # Build the query
            emp_query = db_session.query(CurrentDeptEmp)
            if employee_id:
                emp_query = emp_query.filter_by(emp_no=employee_id)

            # Apply pagination
            paginated_results, pagination_info = paginate_query(
                emp_query, parsed_args['page'], parsed_args['items_per_page']
            )

            # Format the response
            return {
                "data": [
                    {
                        'employee_id': record.emp_no,
                        'department_id': record.dept_no,
                        'start_date': str(record.from_date),
                        'end_date': str(record.to_date)
                    }
                    for record in paginated_results
                ],
                "pagination": pagination_info
            }
        except Exception as error:
            # Handle exceptions and return error response
            return {"error": f"An unexpected error occurred: {str(error)}"}, 500
        finally:
            # Ensure the database session is closed
            db_session.close()