from flask import request, jsonify
from flask_restful import Resource
from werkzeug.utils import secure_filename
import boto3
from models.document import Document
from models.base import Session
import os

# AWS S3 Configuration
s3 = boto3.client('s3')  # Initialize S3 client
S3_BUCKET_NAME = 'courseproject-documents'  # Specify the bucket name


class FileResourceHandler(Resource):  # Renamed class for clarity

    def upload_to_s3(self, file, file_name):
        """
        Upload a file to the configured S3 bucket.
        """
        try:
            s3.upload_fileobj(file, S3_BUCKET_NAME, file_name)
            s3_file_url = f'https://{S3_BUCKET_NAME}.s3.amazonaws.com/{file_name}'
            return s3_file_url
        except Exception as error:
            raise Exception(f"Failed to upload file to S3: {str(error)}")

    def generate_s3_download_url(self, file_key):
        """
        Generate a presigned URL for downloading a file from S3.
        """
        try:
            download_url = s3.generate_presigned_url(
                'get_object',
                Params={'Bucket': S3_BUCKET_NAME, 'Key': file_key},
                ExpiresIn=3600
            )
            return download_url
        except Exception as error:
            raise Exception(f"Failed to generate download URL: {str(error)}")

    def get(self, document_id=None):
        """
        Fetch a specific document or list all documents.
        """
        with Session() as session:
            query = session.query(Document)

            if document_id:
                # Fetch a single document by ID
                document = query.filter_by(document_id=document_id).first()
                if document:
                    try:
                        file_download_url = self.generate_s3_download_url(document.file_path)
                        return jsonify({
                            "file_url": file_download_url,
                            "document": document.to_dict()
                        })
                    except Exception as error:
                        return {"error": str(error)}, 500
                else:
                    return {"message": "Document not found."}, 404

            # Fetch all documents
            all_documents = query.all()
            return jsonify({"data": [doc.to_dict() for doc in all_documents]})

    def post(self):
        """
        Upload a new document and save its metadata.
        """
        if 'file' not in request.files:
            return {"message": "File is missing in the request."}, 400
        file = request.files['file']

        if not file or file.filename == '':
            return {"message": "No file selected."}, 400

        try:
            # Secure the filename and upload the file to S3
            filename = secure_filename(file.filename)
            file_url = self.upload_to_s3(file, filename)

            # Gather metadata for the document
            title = request.form.get('title')
            description = request.form.get('description')
            uploaded_by = request.form.get('uploaded_by')

            new_document = Document(
                title=title,
                description=description,
                file_path=file_url,
                uploaded_by=uploaded_by
            )

            with Session() as session:
                session.add(new_document)
                session.commit()
                return {"message": "Document uploaded successfully."}, 201
        except Exception as error:
            return {"error": str(error)}, 500

    def put(self, document_id):
        """
        Update metadata of an existing document.
        """
        with Session() as session:
            document_data = request.get_json()
            document = session.query(Document).filter_by(document_id=document_id).first()

            if not document:
                return {"message": "Document not found."}, 404

            # Update fields with provided data
            document.title = document_data.get('title', document.title)
            document.description = document_data.get('description', document.description)

            try:
                session.commit()
                return {"message": "Document metadata updated successfully."}
            except Exception as error:
                session.rollback()
                return {"error": f"Failed to update document: {str(error)}"}, 500

    def delete(self, document_id):
        """
        Delete a document and its associated metadata.
        """
        with Session() as session:
            document = session.query(Document).filter_by(document_id=document_id).first()

            if not document:
                return {"message": "Document not found."}, 404

            try:
                # Delete the document record
                session.delete(document)
                session.commit()
                return {"message": "Document deleted successfully."}
            except Exception as error:
                session.rollback()
                return {"error": f"Failed to delete document: {str(error)}"}, 500