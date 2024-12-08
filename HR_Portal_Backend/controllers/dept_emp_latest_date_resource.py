from datetime import datetime
from flask_restful import Resource, reqparse
from models.base import Session
from models.dept_emp_latest_date import DeptEmpLatestDate
from .utils import paginate_query  # Utility for pagination

# Resource to manage the latest department-employee data
class LatestDeptEmployeeResource(Resource):  # Renamed class for clarity

    # Argument parser for handling query parameters
    argument_parser = reqparse.RequestParser(bundle_errors=True)
    argument_parser.add_argument('employee_id', type=int, location='args', help="Employee ID is required")
    argument_parser.add_argument('page_number', type=int, location='args', default=1, help="Page number for pagination")
    argument_parser.add_argument('items_per_page', type=int, location='args', default=10, help="Number of items per page")

    def get(self, employee_id=None):
        """
        Fetch latest department-employee associations.
        """
        db_session = Session()
        try:
            # Parse query parameters
            args = self.argument_parser.parse_args()
            query = db_session.query(DeptEmpLatestDate)

            # Filter by employee ID if provided
            if employee_id:
                query = query.filter_by(emp_no=employee_id)

            # Apply pagination to the query
            results, pagination_info = paginate_query(query, args['page_number'], args['items_per_page'])

            # Format and return the response
            return {
                "data": [
                    {
                        'employee_id': record.emp_no,
                        'start_date': str(record.from_date),
                        'end_date': str(record.to_date),
                    }
                    for record in results
                ],
                "pagination": pagination_info
            }
        except Exception as error:
            # Handle any exceptions that occur
            return {"error": f"An error occurred: {str(error)}"}, 500
        finally:
            # Ensure the session is closed
            db_session.close()