from flask_restful import Resource, reqparse
from models.title import Title
from models.base import Session
from .utils import paginate_query
from datetime import datetime
from flask import request

# Resource to manage title-related operations
class EmployeeTitlesHandler(Resource):  # Renamed class for better clarity

    # Argument parser for query parameters
    query_parser = reqparse.RequestParser(bundle_errors=True)
    query_parser.add_argument('employee_id', type=int, location='args', help="Employee ID")
    query_parser.add_argument('title_name', type=str, location='args', help="Title name")
    query_parser.add_argument('start_date', type=str, location='args', help="Start date")
    query_parser.add_argument('page_number', type=int, location='args', default=1, help="Page number for pagination")
    query_parser.add_argument('items_per_page', type=int, location='args', default=10, help="Number of items per page")

    def get(self, employee_id=None):
        """
        Retrieve title entries with optional filtering, pagination, and search.
        """
        db_session = Session()
        try:
            # Parse query arguments
            args = self.query_parser.parse_args()
            title_query = db_session.query(Title)

            # Filter by employee ID if provided
            if employee_id:
                title_query = title_query.filter_by(emp_no=employee_id)
            else:
                # Apply filters based on query parameters
                if args['employee_id']:
                    title_query = title_query.filter_by(emp_no=args['employee_id'])
                if args['title_name']:
                    title_query = title_query.filter(Title.title.like(f"%{args['title_name']}%"))
                if args['start_date']:
                    title_query = title_query.filter_by(from_date=args['start_date'])

            # Paginate query results
            titles, pagination_info = paginate_query(title_query, args['page_number'], args['items_per_page'])

            # Prepare the response
            response_data = [
                {
                    "employee_id": t.emp_no,
                    "title": t.title,
                    "start_date": str(t.from_date),
                    "end_date": str(t.to_date),
                }
                for t in titles
            ]

            return {"titles": response_data, "pagination": pagination_info}

        except Exception as error:
            # Handle errors and log the issue
            return {"error": f"An error occurred: {str(error)}"}, 500
        finally:
            # Ensure the session is closed
            db_session.close()

    def post(self):
        """
        Add a new title entry for an employee.
        """
        db_session = Session()
        try:
            # Parse incoming data
            data = request.get_json()

            # Validate required fields
            required_fields = ['emp_no', 'title', 'from_date', 'to_date']
            if not all(field in data for field in required_fields):
                return {"message": "Missing required fields."}, 400

            # Check for existing title entry
            existing_entry = db_session.query(Title).filter_by(
                emp_no=data['emp_no'],
                title=data['title'],
                from_date=data['from_date']
            ).first()

            if existing_entry:
                return {"message": "A title entry with these details already exists."}, 400

            # Create new title entry
            new_title_entry = Title(
                emp_no=data['emp_no'],
                title=data['title'],
                from_date=data['from_date'],
                to_date=data['to_date']
            )

            # Add to database and commit
            db_session.add(new_title_entry)
            db_session.commit()
            return {"message": "Title entry created successfully."}, 201

        except Exception as error:
            db_session.rollback()
            return {"error": f"Failed to create title entry: {str(error)}"}, 500
        finally:
            db_session.close()

    def put(self, employee_id, title_name, start_date):
        """
        Update an existing title entry for an employee.
        """
        db_session = Session()
        try:
            # Retrieve the existing title entry
            title_record = db_session.query(Title).filter_by(
                emp_no=employee_id,
                title=title_name,
                from_date=start_date
            ).first()

            if not title_record:
                return {"message": "Title entry not found."}, 404

            # Update fields with new data
            data = request.get_json()
            title_record.to_date = data.get('to_date', title_record.to_date)

            # Commit changes
            db_session.commit()
            return {"message": "Title entry updated successfully."}

        except Exception as error:
            db_session.rollback()
            return {"error": f"Failed to update title entry: {str(error)}"}, 500
        finally:
            db_session.close()

    def delete(self, employee_id, title_name, start_date):
        """
        Delete a title entry for an employee.
        """
        db_session = Session()
        try:
            # Retrieve the existing title entry
            title_record = db_session.query(Title).filter_by(
                emp_no=employee_id,
                title=title_name,
                from_date=start_date
            ).first()

            if not title_record:
                return {"message": "Title entry not found."}, 404

            # Delete the record and commit changes
            db_session.delete(title_record)
            db_session.commit()
            return {"message": "Title entry deleted successfully."}

        except Exception as error:
            db_session.rollback()
            return {"error": f"Failed to delete title entry: {str(error)}"}, 500
        finally:
            db_session.close()