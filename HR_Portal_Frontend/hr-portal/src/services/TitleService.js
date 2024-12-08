import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

const TitleService = {
  fetchTitles: async (page = 1, perPage = 10) => {
    // Fetches a paginated list of titles
    try {
      const response = await axios.get(`${API_BASE_URL}/titles`, { 
        params: { page, per_page: perPage } 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching titles:', error);
      throw error;
    }
  },
  fetchTitlesByTitleName: async (page = 1, perPage = 10, titleName = '') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/titles/search`, { 
        params: { page, per_page: perPage, title: titleName } 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching titles by name:', error);
      throw error;
    }
  },

  addTitle: async (titleData) => {
    // Adds a new title
    try {
      const response = await axios.post(`${API_BASE_URL}/titles`, titleData);
      return response.data;
    } catch (error) {
      console.error('Error adding title:', error);
      throw error;
    }
  },

  updateTitle: async (empNo, title, fromDate, titleData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/titles/${empNo}/${encodeURIComponent(title)}/${fromDate}`, titleData);
      return response.data;
    } catch (error) {
      console.error('Error updating title:', error);
      throw error;
    }
  },
  
  

  deleteTitle: async (empNo, title, fromDate) => {
    // Deletes a title
    try {
      const response = await axios.delete(`${API_BASE_URL}/titles/${empNo}/${title}/${fromDate}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting title:', error);
      throw error;
    }
  }
};

export default TitleService;
