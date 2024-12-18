from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Example

router = APIRouter()


@router.get("/")
def read_examples(db: Session = Depends(get_db)):
    return db.query(Example).all()
