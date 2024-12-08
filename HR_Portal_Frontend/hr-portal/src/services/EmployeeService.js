
// // import axios from 'axios';

// // const BASE_URL = 'https://localhost:5001';

// // const EmployeeService = {
// //     fetchEmployees: (page = 1, searchTerm = '') => {
// //         let url = `${BASE_URL}/employees?page=${page}`;
// //         if (typeof searchTerm === 'string' && searchTerm.trim()) {
// //             if (isNaN(searchTerm)) {
// //                 url += `&search_term=${searchTerm.trim()}`;
// //             } else {
// //                 url += `&emp_no=${searchTerm.trim()}`;
// //             }
// //         }
// //         return axios.get(url);
// //     },

// //     fetchSalariesForEmployees: (empNos) => {
// //         return axios.post(`${BASE_URL}/salaries`, { emp_nos: empNos });
// //     },

// //     fetchEmployeeDetails: (empNo) => {
// //         return axios.get(`${BASE_URL}/employees/${empNo}`);
// //     },

// //     addEmployee: (employeeData) => {
// //         return axios.post(`${BASE_URL}/employees`, employeeData);
// //     },

// //     updateEmployee: (empNo, employeeData) => {
// //         return axios.put(`${BASE_URL}/employees/${empNo}`, employeeData);
// //     },

// //     deleteEmployee: (empNo) => {
// //         return axios.delete(`${BASE_URL}/employees/${empNo}`);
// //     },

// //     fetchDepartment: (empNo) => {
// //         return axios.get(`${BASE_URL}/department_employee/${empNo}`);
// //     },

// //     fetchSalary: (empNo) => {
// //         return axios.get(`${BASE_URL}/salaries/${empNo}`);
// //     },

// //     fetchTitle: (empNo) => {
// //         return axios.get(`${BASE_URL}/titles/${empNo}`);
// //     },

// //     fetchEmployeesByDepartment: (deptNo, page = 1) => {
// //         const url = `${BASE_URL}/departments/${deptNo}/employees?page=${page}`;
// //         return axios.get(url);
// //     },

// //     fetchCurrentDepartment: (empNo) => {
// //         return axios.get(`${BASE_URL}/current_dept_emp/${empNo}`);
// //     },

// //     fetchCurrentTitle: (empNo) => {
// //         return axios.get(`${BASE_URL}/titles/${empNo}`);
// //     },

// //     fetchCurrentSalary: (empNo) => {
// //         return axios.get(`${BASE_URL}/salaries/${empNo}`);
// //     },

// //     fetchDepartmentName: (deptNo) => {
// //         return axios.get(`${BASE_URL}/departments/${deptNo}`);
// //     }
// // };

// // export default EmployeeService;

// // src/services/EmployeeService.js
// import api from '../api'; // Adjust the path as necessary for your project structure

// const EmployeeService = {
//     fetchEmployees: (page = 1, searchTerm = '') => {
//         let url = `/employees?page=${page}`;
//         if (typeof searchTerm === 'string' && searchTerm.trim()) {
//             if (isNaN(searchTerm)) {
//                 url += `&search_term=${searchTerm.trim()}`;
//             } else {
//                 url += `&emp_no=${searchTerm.trim()}`;
//             }
//         }
//         return api.get(url);
//     },

//     fetchSalariesForEmployees: (empNos) => {
//         return api.post(`/salaries`, { emp_nos: empNos });
//     },

//     fetchEmployeeDetails: (empNo) => {
//         return api.get(`/employees/${empNo}`);
//     },

//     addEmployee: (employeeData) => {
//         return api.post(`/employees`, employeeData);
//     },

//     updateEmployee: (empNo, employeeData) => {
//         return api.put(`/employees/${empNo}`, employeeData);
//     },

//     deleteEmployee: (empNo) => {
//         return api.delete(`/employees/${empNo}`);
//     },

//     fetchDepartment: (empNo) => {
//         return api.get(`/department_employee/${empNo}`);
//     },

//     fetchSalary: (empNo) => {
//         return api.get(`/salaries/${empNo}`);
//     },

//     fetchTitle: (empNo) => {
//         return api.get(`/titles/${empNo}`);
//     },

//     fetchEmployeesByDepartment: (deptNo, page = 1) => {
//         const url = `/departments/${deptNo}/employees?page=${page}`;
//         return api.get(url);
//     },

//     fetchCurrentDepartment: (empNo) => {
//         return api.get(`/current_dept_emp/${empNo}`);
//     },

//     fetchCurrentTitle: (empNo) => {
//         return api.get(`/titles/${empNo}`);
//     },

//     fetchCurrentSalary: (empNo) => {
//         return api.get(`/salaries/${empNo}`);
//     },

//     fetchDepartmentName: (deptNo) => {
//         return api.get(`/departments/${deptNo}`);
//     }
// };

// export default EmployeeService;

// src/services/EmployeeService.js

// const EmployeeService = {
//     fetchEmployees: (api, page = 1, searchTerm = '') => {
//       let url = `/employees?page=${page}`;
//       if (typeof searchTerm === 'string' && searchTerm.trim()) {
//         if (isNaN(searchTerm)) {
//           url += `&search_term=${searchTerm.trim()}`;
//         } else {
//           url += `&emp_no=${searchTerm.trim()}`;
//         }
//       }
//       return api.get(url);
//     },
  
//     fetchSalariesForEmployees: (api, empNos) => {
//       return api.post(`/salaries`, { emp_nos: empNos });
//     },
  
//     fetchEmployeeDetails: (api, empNo) => {
//       return api.get(`/employees/${empNo}`);
//     },
  
//     addEmployee: (api, employeeData) => {
//       return api.post(`/employees`, employeeData);
//     },
  
//     updateEmployee: (api, empNo, employeeData) => {
//       return api.put(`/employees/${empNo}`, employeeData);
//     },
  
//     deleteEmployee: (api, empNo) => {
//       return api.delete(`/employees/${empNo}`);
//     },
  
//     fetchDepartment: (api, empNo) => {
//       return api.get(`/department_employee/${empNo}`);
//     },
  
//     fetchSalary: (api, empNo) => {
//       return api.get(`/salaries/${empNo}`);
//     },
  
//     fetchTitle: (api, empNo) => {
//       return api.get(`/titles/${empNo}`);
//     },
  
//     fetchEmployeesByDepartment: (api, deptNo, page = 1) => {
//       const url = `/departments/${deptNo}/employees?page=${page}`;
//       return api.get(url);
//     },
  
//     fetchCurrentDepartment: (api, empNo) => {
//       return api.get(`/current_dept_emp/${empNo}`);
//     },
  
//     fetchCurrentTitle: (api, empNo) => {
//       return api.get(`/titles/${empNo}`);
//     },
  
//     fetchCurrentSalary: (api, empNo) => {
//       return api.get(`/salaries/${empNo}`);
//     },
  
//     fetchDepartmentName: (api, deptNo) => {
//       return api.get(`/departments/${deptNo}`);
//     }
//   };
  
//   export default EmployeeService;
  

import axios from 'axios'; // Ensure you have axios installed and imported

// Create an Axios instance and configure it as needed
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Replace with your API base URL
  // You can include headers here if necessary, like the Auth0 token
});

const EmployeeService = {
  fetchEmployees: (page = 1, searchTerm = '') => {
    let url = `/employees?page=${page}`;
    if (searchTerm.trim()) {
      url += `&search_term=${encodeURIComponent(searchTerm.trim())}`;
    }
    return api.get(url);
  },

  fetchSalariesForEmployees: (empNos) => {
    return api.post(`/salaries`, { emp_nos: empNos });
  },

  fetchEmployeeDetails: (empNo) => {
    return api.get(`/employees/${empNo}`);
  },

  addEmployee: (employeeData) => {
    return api.post(`/employees`, employeeData);
  },

  updateEmployee: (empNo, employeeData) => {
    return api.put(`/employees/${empNo}`, employeeData);
  },

  deleteEmployee: (empNo) => {
    return api.delete(`/employees/${empNo}`);
  },

  fetchDepartment: (empNo) => {
    return api.get(`/department_employee/${empNo}`);
  },

  fetchSalary: (empNo) => {
    return api.get(`/salaries/${empNo}`);
  },

  fetchTitle: (empNo) => {
    return api.get(`/titles/${empNo}`);
  },

  fetchEmployeesByDepartment: (deptNo, page = 1) => {
    return api.get(`/departments/${deptNo}/employees?page=${page}`);
  },

  fetchCurrentDepartment: (empNo) => {
    return api.get(`/current_dept_emp/${empNo}`);
  },

  fetchCurrentTitle: (empNo) => {
    return api.get(`/titles/${empNo}`);
  },

  fetchCurrentSalary: (empNo) => {
    return api.get(`/salaries/${empNo}`);
  },

  fetchDepartmentName: (deptNo) => {
    return api.get(`/departments/${deptNo}`);
  }
};

export default EmployeeService;
