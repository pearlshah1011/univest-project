from pydantic_settings import BaseSettings
from datetime import timedelta

class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str
    
    # AI Service settings
    GEMINI_API_KEY: str
    GEMINI_MODEL_NAME: str = "gemini-2.5-flash"
    
    # Security settings
    SECRET_KEY: str 
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS settings
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
