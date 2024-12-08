# **Secure HR Portal**

## **Project Overview**
The **Secure HR Portal** is a comprehensive HR management system aimed at streamlining employee data management and generating insightful analytics. This Proof-of-Concept (PoC) project demonstrates how enterprise-grade security and efficiency can be achieved. Developed collaboratively by team members **Revanth Malladi (Team Leader), Akshara,
Chandini and Sruthi**, the project showcases a modern approach to HR technology with secure login, real-time analytics, and continuous integration.

---

## **Key Features**
- **Secure Authentication:** Implements Single Sign-On (SSO) and Active Directory (AD) authentication secured with SSL/TLS encryption.  
- **Data Analytics & Visualization:** Interactive dashboards with analytics on salary progression, department composition, and employee demographics.  
- **CI/CD Integration:** Seamless Continuous Integration/Continuous Deployment (CI/CD) using Jenkins for automatic builds and deployments.  
- **Version Control:** GitHub integration for version control and collaboration.  

---

## **Technologies Used**
- **Backend:** Flask (REST API), Flask-RESTful, SQLAlchemy for ORM.  
- **Frontend:** React.js and CSS for a responsive and modern user interface.  
- **Database:** MySQL, utilizing the **datacharmer/test_db** sample dataset.  
- **Authentication:** Auth0 for secure user authentication and role-based access control (RBAC).  
- **DevOps & Security:** Jenkins for CI/CD automation and SSL/TLS for encrypted communications.   

---

## **Setup and Installation**

### **1. Clone the Repository**
To begin, clone the repository to your local system:
\`\`\`bash
git clone https://github.com/revanth2802/hrportalfinal.git
\`\`\`

---

### **2. Database Setup**
1. **Install MySQL**: Download and install MySQL Server.  
2. **Database Initialization**: Load the test dataset from the **datacharmer/test_db** repository.  
   - Follow the setup instructions in the official [datacharmer/test_db](https://github.com/datacharmer/test_db) GitHub repository.  
3. **Quick Setup with Docker**:  
   - Navigate to the \`mysql_win_docker\` directory.  
   - Run the following command to bring up the MySQL container:  
     \`\`\`bash
     docker-compose up -d
     \`\`\`  
   - Once the container is running, access the database according to the instructions in the project's **README** file.  

---

### **3. Backend Setup**
1. **Set Up Virtual Environment**:  
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use \`venv\\Scripts\\activate\`
   \`\`\`

2. **Install Dependencies**:  
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

3. **Environment Variables**: Create a \`.env\` file in the project root with the following content:  
   \`\`\`
   AUTH0_DOMAIN="Your domain"
   API_AUDIENCE="Your API audience"
   DATABASE_URI="mysql+mysqlconnector://username:password@localhost:3306/employees"
   \`\`\`

4. **Run the Server**:  
   \`\`\`bash
   python app.py
   \`\`\`

---

### **4. Frontend Setup**
1. **Navigate to the Frontend Directory**:  
   \`\`\`bash
   cd frontend
   \`\`\`

2. **Install Dependencies**:  
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Variables**: Create a \`.env\` file in the **frontend** directory with the following content:  
   \`\`\`
   REACT_APP_AUTH0_DOMAIN="Your domain"
   REACT_APP_AUTH0_CLIENT_ID="Your client ID"
   REACT_APP_AUTH0_AUDIENCE="Your audience"
   REACT_APP_API_BASE_URL="Your API base URL"
   \`\`\`

4. **Run the Frontend**:  
   \`\`\`bash
   npm start
   \`\`\`

---

## **Application Highlights**
- **Dashboard View**: Gain insights into key employee data, such as department distribution, gender diversity, and salary growth.  
- **Department Insights**: View key statistics for each department, including the number of employees and performance metrics.  
- **Document Management**: Secure file storage and retrieval are implemented using AWS S3 for cloud-based document storage.  

---

## **Environment Setup**
1. **Auth0 Setup**:  
   - Sign up for an Auth0 account and create an application.  
   - Configure the Auth0 tenant and retrieve the **Domain**, **Client ID**, and **Audience**.  
   - Update the \`.env\` files in both the **backend** and **frontend** with the relevant information.  

2. **SSL/TLS Setup**:  
   - Implement TLS using a self-signed certificate for encrypted communication.  
   - Follow instructions to create self-signed certificates using OpenSSL or use a service like Let's Encrypt.  

---

## **CI/CD Integration**
- **Jenkins Setup**:  
  - Configure a Jenkins server to automate the build and deployment process.  
  - Create a Jenkinsfile for the CI/CD pipeline, defining the build, test, and deploy stages.  
  - Use webhooks to trigger builds on GitHub commits.  

---


## **Disclaimer**
This project utilizes publicly available data and fabricated employee information. No real employee data is used or stored. The purpose of this project is educational, serving as a prototype for HR-related software development.  

---

## **License**
This project is licensed under the [Creative Commons Attribution-Share Alike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/).  
"""

# Define the file path to save the README.md file
file_path = '/mnt/data/README.md'

# Write the content to the file
with open(file_path, 'w') as file:
    file.write(readme_content)

# Return the path to the file so the user can download it
file_path
