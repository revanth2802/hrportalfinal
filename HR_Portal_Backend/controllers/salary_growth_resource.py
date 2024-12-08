from flask_restful import Resource
from models.base import Session
from models.employee import Employee
from models.salary import Salary  # Assuming this is the correct import for your Salary model
from sqlalchemy import func, extract

# Resource to calculate salary growth trends
class MonthlySalaryTrends(Resource):  # Renamed class for clarity
    def get(self):
        """
        Retrieve average salary growth trends by month.
        """
        db_session = Session()  # Initialize the database session
        try:
            # Aggregate query to calculate average salaries grouped by month
            salary_trends_query = db_session.query(
                extract('month', Salary.from_date).label('month'),  # Extract the month from the salary start date
                func.avg(Salary.salary).label('average_salary')  # Calculate the average salary
            ).group_by(
                extract('month', Salary.from_date)  # Group by the extracted month
            ).order_by('month')  # Order results by month
            salary_trends = salary_trends_query.all()

            # Convert the query results into a structured list for easier frontend processing
            monthly_trends = [
                {"month": month, "average_salary": float(avg_salary)}
                for month, avg_salary in salary_trends
            ]

            # Return the result in JSON format
            return {"monthly_salary_trends": monthly_trends}

        except Exception as error:
            # Handle any exceptions that occur and log the error
            return {"error": f"An error occurred: {str(error)}"}, 500

        finally:
            # Ensure the database session is closed
            db_session.close()