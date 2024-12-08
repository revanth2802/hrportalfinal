import React from 'react';

function TitleList({ titles, onEdit, onDelete }) {
  return (
    <div className="title-list">
      <h2>List of Titles</h2>
      <table>
        <thead>
          <tr>
            <th>Employee No.</th>
            <th>Title</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {titles.map((title, index) => (
            <tr key={index}>
              <td>{title.emp_no}</td>
              <td>{title.title}</td>
              <td>{title.from_date}</td>
              <td>{title.to_date}</td>
              <td>
                <button onClick={() => onEdit(title)}>Edit</button>
                <button onClick={() => onDelete(title.emp_no, title.title, title.from_date)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TitleList;
