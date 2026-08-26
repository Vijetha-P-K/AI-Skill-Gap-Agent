# 🤖 AI Skill Gap Analysis Agent

> An AI-powered full-stack career development platform that helps students and fresh graduates identify skill gaps, build personalized learning roadmaps, analyze resumes, discover suitable projects, and prepare for interviews.

## ✨ Features

* 🧠 **AI Skill Gap Analysis** — Select a technology, mark completed topics, and get a personalized AI-generated skill-gap report.
* 🗺️ **Personalized Learning Roadmap** — Generate a structured roadmap from Beginner → Intermediate → Advanced → Industry Ready.
* 📄 **Resume Analysis** — Upload a PDF resume and receive an ATS score, strengths, weak sections, missing keywords, and improvement suggestions.
* 💡 **Project Recommendations** — Get project ideas based on your current skills, experience level, and career goals.
* 🎤 **Interview Preparation** — Generate technical questions, HR questions, coding challenges, and MCQs.
* 📊 **Dashboard** — Track skill levels, progress, resume scores, recommendations, and analysis history.
* 🔐 **JWT Authentication** — Secure registration and login with password hashing and protected API endpoints.

## 🛠️ Technology Stack

| Layer              | Technologies                            |
| ------------------ | --------------------------------------- |
| 🎨 Frontend        | React.js, JavaScript, CSS3              |
| 🧭 Routing         | React Router DOM                        |
| 🌐 API Client      | Axios                                   |
| 🎨 UI Icons        | Lucide React                            |
| ⚙️ Backend         | Python, FastAPI, Pydantic               |
| 🤖 AI              | Groq API, LangChain, Prompt Engineering |
| 🔎 Vector Database | ChromaDB                                |
| 🗄️ Database       | PostgreSQL                              |
| 🔐 Authentication  | JWT, bcrypt                             |
| 🐳 Deployment      | Docker, Docker Compose                  |
| ⚙️ CI/CD           | GitHub Actions                          |

## 🏗️ Project Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
FastAPI Backend
 │
 ├── 🔐 Authentication
 ├── 🧠 Skill Gap Agent
 ├── 🗺️ Roadmap Agent
 ├── 📄 Resume Analyzer
 ├── 💡 Project Recommendation Agent
 └── 🎤 Interview Preparation Agent
          │
          ▼
    ┌───────────────┐
    │   LangChain   │
    └───────┬───────┘
            │
     ┌──────┴──────┐
     ▼             ▼
  Groq API      ChromaDB
     │             │
     └──────┬──────┘
            ▼
      Personalized
       AI Response
            │
            ▼
       PostgreSQL
```


## 🔌 API Endpoints

| Endpoint                   | Method | Description                      |
| -------------------------- | ------ | -------------------------------- |
| `/api/auth/register`       | POST   | Create account                   |
| `/api/auth/login`          | POST   | Login and receive JWT            |
| `/api/auth/me`             | GET    | Get current user                 |
| `/api/skills/technologies` | GET    | Get technologies and topics      |
| `/api/skills/analyze`      | POST   | Generate skill-gap analysis      |
| `/api/skills/roadmap`      | POST   | Generate learning roadmap        |
| `/api/skills/projects`     | POST   | Generate project recommendations |
| `/api/skills/interview`    | POST   | Generate interview preparation   |
| `/api/resume/analyze`      | POST   | Analyze resume PDF               |
| `/api/reports/dashboard`   | GET    | Get dashboard statistics         |


## 🚀 Quick Start

## 💻 Local Development

### Backend

```bash
cd backend

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

cp .env.example .env

uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

## 🔐 Security

* 🔒 Passwords hashed using bcrypt
* 🎟️ JWT-based authentication
* 🛡️ Protected API endpoints
* ✅ Pydantic request validation
* 📄 Secure PDF upload validation
* 📦 File size restrictions
* 🌐 CORS configuration
* 🔑 Environment-based secrets

## 🎯 Target Users

* 🎓 Students looking to improve their technical skills
* 👨‍💻 Fresh graduates preparing for their first job
* 🚀 Job seekers identifying missing industry skills
* 💼 Candidates preparing for technical interviews

## 🔮 Future Enhancements

* 🎯 Job Description Skill Matching
* 🔗 LinkedIn Profile Analysis
* 💻 Interactive Coding Assessments
* 📚 AI-Generated Study Materials
* 🏆 Gamified Learning
* 📈 Advanced Career Analytics
* 💬 AI Career Assistant
* 📑 Resume Version Comparison
* 🔔 Personalized Learning Reminders
* ☁️ Cloud Deployment

## 👩‍💻 Project Highlights

> 🤖 **AI-powered career guidance in one platform — from identifying skill gaps to becoming interview-ready.**

### 🔑 Core Technologies

`React.js` • `FastAPI` • `Python` • `Groq` • `LangChain` • `ChromaDB` • `PostgreSQL` • `JWT` • `Docker`

---

⭐ If you find this project useful, consider giving the repository a star!

**Built with ❤️ using React, FastAPI, Groq, LangChain, ChromaDB, and PostgreSQL.**
