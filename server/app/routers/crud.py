from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Example

router = APIRouter()


# Create
@router.post("/")
def create_example(name: str, db: Session = Depends(get_db)):
    new_example = Example(name=name)
    db.add(new_example)
    db.commit()
    db.refresh(new_example)
    return new_example


# Read all
@router.get("/")
def read_examples(db: Session = Depends(get_db)):
    return db.query(Example).all()


# Read one
@router.get("/{example_id}")
def read_example(example_id: int, db: Session = Depends(get_db)):
    example = db.query(Example).filter(Example.id == example_id).first()
    if example is None:
        raise HTTPException(status_code=404, detail="Example not found")
    return example


# Update
@router.put("/{example_id}")
def update_example(example_id: int, name: str, db: Session = Depends(get_db)):
    example = db.query(Example).filter(Example.id == example_id).first()
    if example is None:
        raise HTTPException(status_code=404, detail="Example not found")
    example.name = name
    db.commit()
    db.refresh(example)
    return example


# Delete
@router.delete("/{example_id}")
def delete_example(example_id: int, db: Session = Depends(get_db)):
    example = db.query(Example).filter(Example.id == example_id).first()
    if example is None:
        raise HTTPException(status_code=404, detail="Example not found")
    db.delete(example)
    db.commit()
    return {"detail": "Example deleted"}
