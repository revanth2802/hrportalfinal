// src/auth.js
import { useAuth0 } from "@auth0/auth0-react";

export const useAuth = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAuthToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      return token;
    } catch (error) {
      console.error('Error during token retrieval:', error);
      // Depending on how you want to handle errors, you might want to return null or throw an error
      return null;
    }
  };

  return { getAuthToken };
};
