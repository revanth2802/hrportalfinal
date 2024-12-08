from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Initialize environment variable loader
load_dotenv()

# Fetch the database connection string from the environment variables
DB_CONNECTION_STRING = os.getenv('DATABASE_URI')

# Create the SQLAlchemy engine
db_engine = create_engine(DB_CONNECTION_STRING, echo=True)

# Configure session maker for database operations
DatabaseSession = sessionmaker(bind=db_engine)

# Declare the base class for ORM models
ORMBase = declarative_base()