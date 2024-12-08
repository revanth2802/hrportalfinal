import React, { useState } from 'react';

const DocumentUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedBy, setUploadedBy] = useState(''); // You'll need to set this from user input or context

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && title && description && uploadedBy) {
      onUpload(file, title, description, uploadedBy);
    } else {
      console.log('All fields are required');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea 
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input 
        type="text"
        value={uploadedBy}
        onChange={e => setUploadedBy(e.target.value)}
        placeholder="Uploaded By"
      />
      <input 
        type="file" 
        onChange={e => setFile(e.target.files[0])} 
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default DocumentUpload;

