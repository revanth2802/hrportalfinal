import React, { useState, useEffect } from 'react';
import DocumentList from './DocumentList';
import DocumentUpload from './DocumentUpload';
import { useDocumentService } from '../../services/DocumentService'; // Make sure this path is correct

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const { fetchDocuments, uploadDocument, deleteDocument } = useDocumentService();

  useEffect(() => {
    const fetchAndSetDocuments = async () => {
      try {
        const response = await fetchDocuments();
        console.log("Fetched documents:", response); 
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
  
    fetchAndSetDocuments();
  }, [fetchDocuments]);
  

  return (
    <div>
      <h1>Documents Management</h1>
      <DocumentUpload onUpload={uploadDocument} />
      {Array.isArray(documents) ? (
        <DocumentList 
          documents={documents} 
          onDelete={deleteDocument}
        />
      ) : (
        <p>No documents to display.</p>
    </div>
  );
};

export default DocumentsPage;
