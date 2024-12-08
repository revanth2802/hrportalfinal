import React, { useState, useEffect, useCallback } from 'react';
import TitleList from './TitleList'; 
import TitleForm from './TitleForm'; 
import TitleService from '../../services/TitleService'; 
import './TitlesPage.css';

function TitlesPage() {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const fetchTitles = useCallback((query = '', page = currentPage) => {
    TitleService.fetchTitlesByTitleName(page, itemsPerPage, query)
      .then(response => {
        setTitles(response.data);
        setTotalPages(Math.ceil(response.pagination.total_items / itemsPerPage));
      })
      .catch(error => console.error('Error fetching titles:', error));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchTitles(searchQuery, currentPage);
  }, [fetchTitles, searchQuery, currentPage]);

  const handleAddOrUpdateTitle = (titleData) => {
    if (isEditMode && selectedTitle) {
      const { emp_no, title, from_date } = selectedTitle;
      TitleService.updateTitle(emp_no, title, from_date, titleData)
        .then(response => {
          console.log("Update successful:", response);
          fetchTitles(searchQuery, currentPage);
          setSelectedTitle(null);
          setIsEditMode(false);
        })
        .catch(error => console.error('Error updating title:', error));
    } else {
      TitleService.addTitle(titleData)
        .then(response => {
          console.log("Add successful:", response);
          fetchTitles(searchQuery, currentPage);
          setSelectedTitle(null);
          setIsEditMode(false);
        })
        .catch(error => console.error('Error adding title:', error));
    }
  };

  const handleEditClick = (title) => {
    setSelectedTitle(title);
    setIsEditMode(true);
  };

  const handleDeleteTitle = (empNo, title, fromDate) => {
    TitleService.deleteTitle(empNo, title, fromDate)
      .then(() => fetchTitles(searchQuery, currentPage))
      .catch(error => console.error('Error deleting title:', error));
  };

  const handleSearch = () => {
    fetchTitles(searchQuery, 1);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    const newPage = Math.max(1, currentPage - 1);
    setCurrentPage(newPage);
    fetchTitles(searchQuery, newPage);
  };

  const handleNextPage = () => {
    const newPage = Math.min(totalPages, currentPage + 1);
    setCurrentPage(newPage);
    fetchTitles(searchQuery, newPage);
  };

  return (
    <div className="titles-page">
      <h1>Employee Titles</h1>
      
      <div>
        <input 
          type="text" 
          placeholder="Search by title..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <TitleForm 
        onAddOrUpdateTitle={handleAddOrUpdateTitle} 
        selectedTitle={selectedTitle}
        isEditMode={isEditMode}
        onCancel={() => { 
          setSelectedTitle(null);
          setIsEditMode(false);
        }} 
      />

      <TitleList 
        titles={titles} 
        onEdit={handleEditClick} 
        onDelete={handleDeleteTitle} 
      />

      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default TitlesPage;

