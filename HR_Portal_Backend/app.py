from auth_middleware import check_jwt
from flask import Flask, jsonify
from flask_restful import Api
from flask_cors import CORS
from json import JSONEncoder
from decimal import Decimal
import logging

# Import resource handlers
from controllers.employee_resource import EmployeeHandler
from controllers.department_resource import DepartmentHandler
from controllers.title_resource import TitleHandler
from controllers.department_employee_resource import DeptEmployeeHandler
from controllers.department_manager_resource import DeptManagerHandler
from controllers.salary_resource import SalaryHandler
from controllers.current_dept_emp_resource import CurrentDeptHandler
from controllers.dept_emp_latest_date_resource import DeptEmpDateHandler
from controllers.gender_distribution_resource import GenderDistHandler
from controllers.salary_growth_resource import SalaryGrowthHandler
from controllers.average_salary_per_department_resource import AvgSalaryHandler
from controllers.document_resource import DocumentHandler


# Custom JSON Encoder for handling Decimal types
class DecimalToFloatJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)  # Convert Decimal objects to float
        return super(DecimalToFloatJSONEncoder, self).default(obj)

# Initialize Flask app
app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)  # Set logging level
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)  # Log SQLAlchemy queries

# Set custom JSON encoder
app.json_encoder = DecimalToFloatJSONEncoder

# Enable CORS for all origins
CORS(app, origins=["*"])

# Configurations
app.config['PROPAGATE_EXCEPTIONS'] = True

# Create API instance with Flask
api = Api(app, catch_all_404s=True,
          default_mediatype='application/json',
          errors={
              'UnsupportedMediaType': {
                  'message': "Content-Type must be 'application/json'.",
                  'status': 415,
              }
          })

# Error handlers
@app.errorhandler(404)
def handle_not_found(error):
    return jsonify(error="Resource not found"), 404

@app.errorhandler(500)
def handle_internal_error(error):
    app.logger.error("Internal server error: %s", error)
    return jsonify(error="Internal Server Error"), 500

# Add resource endpoints to the API
api.add_resource(EmployeeHandler, '/employees', '/employees/<int:emp_id>')
api.add_resource(DepartmentHandler, '/departments', '/departments/<string:dept_id>', '/departments/<string:dept_id>/employees')
api.add_resource(DeptEmployeeHandler, '/dept_employee', '/dept_employee/<int:emp_id>', '/dept_employee/<int:emp_id>/<string:dept_id>')
api.add_resource(DeptManagerHandler, '/dept_manager', '/dept_manager/<int:emp_id>', '/dept_manager/<string:dept_id>', '/dept_manager/<int:emp_id>/<string:dept_id>', '/departments/<string:dept_id>/manager')
api.add_resource(SalaryHandler, '/salaries', '/salaries/<int:emp_id>', '/salaries/<int:emp_id>/<string:from_date>')
api.add_resource(TitleHandler, '/titles', '/titles/<int:emp_id>', '/titles/<int:emp_id>/<string:title>', '/titles/<int:emp_id>/<string:title>/<string:from_date>')
api.add_resource(CurrentDeptHandler, '/current_dept', '/current_dept/<int:emp_id>')
api.add_resource(DeptEmpDateHandler, '/dept_emp_latest', '/dept_emp_latest/<int:emp_id>')
api.add_resource(GenderDistHandler, '/employees/gender_dist')
api.add_resource(SalaryGrowthHandler, '/salary_growth')
api.add_resource(AvgSalaryHandler, '/avg_salary_per_dept')
api.add_resource(TitleHandler, '/titles/search', endpoint='search_titles')
api.add_resource(DocumentHandler, '/documents', '/documents/<int:doc_id>')

# Entry point for the application
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)
    # Uncomment below for HTTPS
    # app.run(debug=True, ssl_context=('cert.pem', 'key.pem'))