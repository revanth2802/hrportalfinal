from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from .base import ORMBase  # Base class for ORM mapping

# Define the Document model for ORM mapping
class FileRecord(ORMBase):  # Renamed class for better clarity
    __tablename__ = 'documents'  # Corresponds to the 'documents' table in the database

    # Columns for the table
    record_id = Column(Integer, primary_key=True)  # Unique ID for the document
    file_title = Column(String(255), nullable=False)  # Title of the document
    file_description = Column(Text)  # Optional description of the document
    created_date = Column(DateTime)  # Date when the document was uploaded
    storage_path = Column(String(255), nullable=False)  # File path where the document is stored
    uploader_id = Column(Integer, ForeignKey('employees.emp_no'))  # ID of the employee who uploaded the document

    # Relationship with the Employee model
    uploader = relationship("Employee", backref="file_records")  # Defines relationship with Employee

    # Convert the document instance to a dictionary for serialization
    def as_dict(self):  # Renamed from `to_dict`
        return {
            'record_id': self.record_id,
            'file_title': self.file_title,
            'file_description': self.file_description,
            'created_date': self.created_date.isoformat() if self.created_date else None,
            'storage_path': self.storage_path,
            'uploader_id': self.uploader_id
        }

    # String representation for debugging
    def __repr__(self):
        return f'<FileRecord {self.file_title}>'