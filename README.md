# 🎯 Univest Meeting Assistant

A modern web application that leverages AI to automatically generate meeting summaries and action items from transcripts. Built with FastAPI and React, it helps teams capture and organize meeting insights efficiently.

## ✨ Key Features

- **AI-Powered Summarization**: Automatically generates concise meeting summaries
- **Action Item Extraction**: Identifies and organizes key action items
- **Secure Authentication**: JWT-based user authentication
- **Responsive Interface**: Modern React-based UI with real-time updates
- **RESTful API**: Well-documented FastAPI endpoints
- **Secure Authentication**: JWT-based authentication system
- **Modern Stack**: FastAPI backend + React frontend
- **Real-time Processing**: Instant AI analysis and feedback
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🛠️ Technical Stack

### Backend
- **Framework**: FastAPI
- **Database**: SQLite (easily configurable for PostgreSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: Google Gemini AI
- **API Documentation**: Swagger UI (automatically generated)

### Frontend
- **Framework**: React
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: Custom CSS with modern features

## 📋 Project Structure

```bash
univest-project/
├── app/
│   ├── api/
│   │   ├── auth.py         # Authentication endpoints
│   │   └── meetings.py     # Meeting management endpoints
│   ├── core/
│   │   ├── config.py       # Configuration management
│   │   └── security.py     # Security utilities
│   ├── db/
│   │   ├── database.py     # Database configuration
│   │   └── models.py       # SQLAlchemy models
│   ├── schemas/
│   │   └── schemas.py      # Pydantic models
│   └── services/
│       └── ai_service.py   # AI processing logic
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api.js         # API integration
│   │   └── App.jsx        # Main application
│   └── index.html
└── requirements.txt
```

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+
- Google Gemini API key

## 🚀 Getting Started

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/pearlshah1011/univest-project.git
   cd univest-project
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create .env file in project root:
   ```env
   DATABASE_URL="sqlite:///./test.db"
   GEMINI_API_KEY="your-gemini-api-key"
   GEMINI_MODEL_NAME="gemini-2.5-flash"
   SECRET_KEY="your-secret-key"
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file in frontend directory:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   VITE_PORT=3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔒 API Endpoints

### Authentication
- POST `/register` - Create new user account
  ```json
  {
    "email": "user@example.com",
    "password": "secure-password"
  }
  ```
- POST `/token` - Login and get access token

### Meetings
- GET `/meetings/` - List all meetings
- GET `/meetings/{meeting_id}` - Get specific meeting
- POST `/meetings/` - Create new meeting
  ```json
  {
    "title": "Meeting Title",
    "transcript": "Meeting transcript content..."
  }
  ```

## 📱 Features

### User Authentication
- Secure registration and login
- JWT token-based authentication
- Protected API endpoints

### Meeting Management
- Create and store meetings
- Generate AI-powered summaries
- Extract actionable items
- View meeting history

### AI Integration
- Google Gemini API integration
- Smart content analysis
- Structured data extraction
- Configurable summarization

## 🧪 Development

### Running Tests
```bash
# Backend tests
pytest app/tests/

# Frontend tests
cd frontend && npm test
```

### Environment Variables
- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: JWT signing key
- `GEMINI_API_KEY`: Google Gemini API key
- `GEMINI_MODEL_NAME`: Model identifier

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://reactjs.org/)
- [Google Gemini AI](https://ai.google.dev/)
      "transcript": "This is a sample meeting transcript."
    }
    ```
- `GET /meetings/{meeting_id}`: Retrieves a meeting by its ID.
