
import axios from 'axios';
import { Auth0Context } from '@auth0/auth0-react';
import  { useContext } from 'react';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
});

// This function will be used to inject the Auth0 Token into the Axios instance
export const useAuth0Api = () => {
  const { getAccessTokenSilently } = useContext(Auth0Context);

  api.interceptors.request.use(
    async (config) => {
      const token = await getAccessTokenSilently();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
};

export default useAuth0Api;


