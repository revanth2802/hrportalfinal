from flask_restful import Resource
from models.employee import Employee
from models.base import Session
from sqlalchemy import func

# Resource to handle gender distribution among employees
class EmployeeGenderStats(Resource):  # Renamed class for clarity
    def get(self):
        """
        Retrieve the gender distribution of employees.
        """
        db_session = Session()
        try:
            # Aggregate query to calculate gender counts
            gender_counts = db_session.query(
                Employee.gender,
                func.count(Employee.gender).label('gender_count')
            ).group_by(Employee.gender).all()

            # Transform the query results into a dictionary for easier consumption
            stats = {gender: count for gender, count in gender_counts}

            # Return the result as JSON
            return {"gender_distribution": stats}

        except Exception as error:
            # Handle and log errors
            return {"error": f"An error occurred: {str(error)}"}, 500

        finally:
            # Ensure the session is closed
            db_session.close()