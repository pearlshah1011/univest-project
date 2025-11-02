from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    meetings = relationship("Meeting", back_populates="owner")

class Meeting(Base):
    __tablename__ = "meetings"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    transcript = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    owner = relationship("User", back_populates="meetings")
    action_items = relationship("ActionItem", back_populates="meeting")

class ActionItem(Base):
    __tablename__ = "action_items"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    deadline = Column(String, nullable=True)
    person = Column(JSON, nullable=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id"))
    meeting = relationship("Meeting", back_populates="action_items")
