from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import meetings, auth
from app.db import models
from app.db.database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",  # Default Vite port
    "http://127.0.0.1:5173",
    "https://univest-project.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=["auth"])
app.include_router(meetings.router, tags=["meetings"])
