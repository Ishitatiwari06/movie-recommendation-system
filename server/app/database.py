from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base 
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./movies.db"
# create connection between python and db
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} #false - so that sqlite allows multiple threads, by default it works on single thread
)
# creates db sessions
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False, #this will prevent auto sending data, user need to commit it
    bind=engine #connect session to db engine
)
# create base class for orm models
Base = declarative_base()