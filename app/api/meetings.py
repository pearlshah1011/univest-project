from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db import models
from app.schemas import schemas
from app.db.database import get_db
from app.services import ai_service
from app.api.auth import get_current_user

router = APIRouter()

@router.post("/meetings/", response_model=schemas.Meeting)
def create_meeting(
    meeting: schemas.MeetingCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    ai_output = ai_service.get_summary_and_action_items(meeting.title, meeting.transcript)
    
    db_meeting = models.Meeting(
        title=meeting.title,
        transcript=meeting.transcript,
        summary=ai_output["summary"],
        owner_id=current_user.id
    )
    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)
    
    for item in ai_output["action_items"]:
        db_action_item = models.ActionItem(**item, meeting_id=db_meeting.id)
        db.add(db_action_item)
    
    db.commit()
    db.refresh(db_meeting)
    
    return db_meeting

@router.get("/meetings/", response_model=List[schemas.Meeting])
def list_meetings(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    meetings = db.query(models.Meeting).filter(models.Meeting.owner_id == current_user.id).all()
    return meetings

@router.get("/meetings/{meeting_id}", response_model=schemas.Meeting)
def read_meeting(
    meeting_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    db_meeting = db.query(models.Meeting).filter(
        models.Meeting.id == meeting_id,
        models.Meeting.owner_id == current_user.id
    ).first()
    if db_meeting is None:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return db_meeting
