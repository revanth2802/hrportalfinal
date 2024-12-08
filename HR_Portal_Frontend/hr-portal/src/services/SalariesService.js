const API_URL = 'http://localhost:5001'; 

export default class SalariesService {
    
    static async fetchSalaries(page, searchTerm) {
        const url = `${API_URL}/salaries?page=${page}&search_term=${searchTerm}`;
        console.log("Fetching salaries with URL:", url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log("Received response:", data);
        
        SalariesService.handleErrors(response);
        return data;
    }

    static async updateSalary(emp_no, data) {
        const response = await fetch(`${API_URL}/salaries/${emp_no}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)  // Modified this line
        });
    
        // Log the raw response
        console.log("Raw Update Salary Response:", response);
    
        // Process the response
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonResponse = await response.json();
        console.log("Processed Update Salary Response:", jsonResponse);
        return jsonResponse;
    }
    
    static async addSalary(data) {
        const response = await fetch(`${API_URL}/salaries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)  // Modified this line
        });
    
        // Log the raw response
        console.log("Raw Add Salary Response:", response);
    
        // Process the response
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonResponse = await response.json();
        console.log("Processed Add Salary Response:", jsonResponse);
        return jsonResponse;
    }
    




    static async deleteSalary(emp_no) {
        const response = await fetch(`${API_URL}/salaries/${emp_no}`, {
            method: 'DELETE'
        });
        SalariesService.handleErrors(response);
        return response.json();
    }

    static handleErrors(response) {
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Invalid request. Please check the data and try again.');
            } else if (response.status === 404) {
                throw new Error('Salary or Employee not found.');
            } else if (response.status === 500) {
                throw new Error('Internal server error. Please try again later.');
            } else {
                throw new Error('Network response was not ok');
            }
        }
    }
}
