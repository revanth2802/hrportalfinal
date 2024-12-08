// import { useCallback } from 'react';

// import useAuth0Api from "../api";


// export const useDocumentService = () => {
//   const api = useAuth0Api();

//   const fetchDocuments = useCallback(async () => {
//     const response = await api.get('/documents');
//     return response.data.data; 
//   }, [api]);

//   const uploadDocument = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     await api.post('/documents', formData);
//   };

//   const deleteDocument = async (documentId) => {
//     await api.delete(`/documents/${documentId}`);
//   };

//   return { fetchDocuments, uploadDocument, deleteDocument };
// };


import { useCallback } from 'react';
import useAuth0Api from "../api";

export const useDocumentService = () => {
  const api = useAuth0Api();

  const fetchDocuments = useCallback(async () => {
    const response = await api.get('/documents');
    return response.data; 
  }, [api]);
  

  const uploadDocument = async (file, title, description, uploadedBy) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('uploaded_by', uploadedBy);
    await api.post('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };
  
  

  const deleteDocument = async (documentId) => {
    await api.delete(`/documents/${documentId}`);
  };

  return { fetchDocuments, uploadDocument, deleteDocument };
};

export default useDocumentService;