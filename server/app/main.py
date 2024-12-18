from fastapi import FastAPI
from app.routers import example, crud
from app.database import Base, engine

# Initialize database
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include routers
app.include_router(example.router, prefix="/example")


# This updates the /example endpoint
app.include_router(crud.router, prefix="/crud")
