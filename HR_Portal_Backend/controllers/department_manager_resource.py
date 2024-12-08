from flask_restful import Resource, reqparse
from models.department_manager import DepartmentManager
from models.base import Session
from .utils import paginate_query  # Utility for pagination

# Resource for handling Department-Manager associations
class DepartmentManagerResource(Resource):  # Renamed class for improved clarity

    # Define a parser for query and payload arguments
    query_parser = reqparse.RequestParser(bundle_errors=True)
    query_parser.add_argument('manager_id', type=int, location='args', help="Manager ID is required")
    query_parser.add_argument('department_code', type=str, location='args', help="Department Code is required")
    query_parser.add_argument('page', type=int, location='args', default=1, help="Pagination page number")
    query_parser.add_argument('page_size', type=int, location='args', default=10, help="Number of items per page")

    def get(self, manager_id=None, department_code=None):
        """
        Retrieve department-manager associations with optional filters.
        """
        db_session = Session()
        try:
            # Parse query parameters
            args = self.query_parser.parse_args()
            query = db_session.query(DepartmentManager)

            # Apply filters if specific parameters are provided
            if manager_id:
                query = query.filter_by(emp_no=manager_id)

            if department_code:
                # Sort by `to_date` descending to prioritize current managers
                query = query.filter_by(dept_no=department_code).order_by(DepartmentManager.to_date.desc())

            # Apply pagination
            results, pagination_details = paginate_query(query, args['page'], args['page_size'])

            # Format the response data
            return {
                "data": [
                    {
                        'manager_id': record.emp_no,
                        'department_code': record.dept_no,
                        'start_date': str(record.from_date),
                        'end_date': str(record.to_date),
                    }
                    for record in results
                ],
                "pagination": pagination_details
            }
        except Exception as error:
            # Handle exceptions and return an error response
            return {"error": f"An error occurred: {str(error)}"}, 500
        finally:
            # Ensure the session is closed
            db_session.close()

    def post(self):
        """
        Create a new department-manager association.
        """
        db_session = Session()
        data = self.query_parser.parse_args()

        # Check if the relationship already exists
        existing_relation = db_session.query(DepartmentManager).filter_by(
            emp_no=data['manager_id'],
            dept_no=data['department_code'],
            from_date=data.get('start_date')
        ).first()

        if existing_relation:
            return {"message": "This relationship already exists."}, 400

        # Create a new association record
        new_relation = DepartmentManager(
            emp_no=data['manager_id'],
            dept_no=data['department_code'],
            from_date=data.get('start_date'),
            to_date=data.get('end_date')
        )

        try:
            db_session.add(new_relation)
            db_session.commit()
            return {"message": "Department-Manager relationship added successfully."}, 201
        except Exception as error:
            db_session.rollback()
            return {"error": f"An error occurred: {str(error)}"}, 500
        finally:
            db_session.close()

    def put(self, manager_id, department_code, start_date):
        """
        Update an existing department-manager association.
        """
        db_session = Session()
        data = self.query_parser.parse_args()

        # Find the specific relationship
        relation = db_session.query(DepartmentManager).filter_by(
            emp_no=manager_id,
            dept_no=department_code,
            from_date=start_date
        ).first()

        if relation:
            # Update fields
            relation.dept_no = data['department_code']
            relation.to_date = data.get('end_date')
            try:
                db_session.commit()
                return {"message": "Relationship updated successfully."}
            except Exception as error:
                db_session.rollback()
                return {"error": f"An error occurred: {str(error)}"}, 500
            finally:
                db_session.close()

        return {"message": "No matching relationship found."}, 404

    def delete(self, manager_id, department_code, start_date):
        """
        Delete a department-manager association.
        """
        db_session = Session()
        relation = db_session.query(DepartmentManager).filter_by(
            emp_no=manager_id,
            dept_no=department_code,
            from_date=start_date
        ).first()

        if relation:
            try:
                db_session.delete(relation)
                db_session.commit()
                return {"message": "Relationship deleted successfully."}
            except Exception as error:
                db_session.rollback()
                return {"error": f"An error occurred: {str(error)}"}, 500
            finally:
                db_session.close()

        return {"message": "No matching relationship found."}, 404