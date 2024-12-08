import React, { useState, useEffect } from 'react';

function TitleForm({ onAddOrUpdateTitle, selectedTitle, isEditMode, onCancel }) {
  const [titleData, setTitleData] = useState({
    emp_no: '',
    title: '',
    from_date: '',
    to_date: ''
  });

  useEffect(() => {
    // If in edit mode, pre-fill the form with the selected title's data
    if (isEditMode && selectedTitle) {
      setTitleData(selectedTitle);
    }
  }, [isEditMode, selectedTitle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTitleData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOrUpdateTitle(titleData);
    setTitleData({ emp_no: '', title: '', from_date: '', to_date: '' }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="title-form">
      <h2>{isEditMode ? 'Edit Title' : 'Add Title'}</h2>
      
      <label>
        Employee Number:
        <input
          type="number"
          name="emp_no"
          value={titleData.emp_no}
          onChange={handleChange}
          required
        />
      </label>
      
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={titleData.title}
          onChange={handleChange}
          required
        />
      </label>
      
      <label>
        From Date:
        <input
          type="date"
          name="from_date"
          value={titleData.from_date}
          onChange={handleChange}
          required
        />
      </label>
      
      <label>
        To Date:
        <input
          type="date"
          name="to_date"
          value={titleData.to_date}
          onChange={handleChange}
        />
      </label>
      
      <button type="submit">{isEditMode ? 'Update Title' : 'Add Title'}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default TitleForm;
