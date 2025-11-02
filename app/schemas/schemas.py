from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserBase(BaseModel):
    email: EmailStr

from pydantic import validator

class UserCreate(UserBase):
    password: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError('password must be at least 6 characters long')
        return v

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class ActionItemBase(BaseModel):
    description: str
    deadline: Optional[str] = None
    person: Optional[List[str]] = None

class ActionItemCreate(ActionItemBase):
    pass

class ActionItem(ActionItemBase):
    id: int
    meeting_id: int

    class Config:
        from_attributes = True

class MeetingBase(BaseModel):
    title: str
    transcript: str

class MeetingCreate(MeetingBase):
    pass

class Meeting(MeetingBase):
    id: int
    title: str
    summary: str
    created_at: datetime
    action_items: List[ActionItem] = []

    class Config:
        from_attributes = True
