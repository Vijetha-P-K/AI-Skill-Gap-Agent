# AI Skill Gap Analysis Agent

An AI-powered full-stack web application that helps students and fresh graduates identify
their technical skill gaps, generate personalized learning roadmaps, analyze resumes,
get project recommendations, and prepare for interviews — powered by real AI using the
Groq API, LangChain, and semantic retrieval from ChromaDB.

## Features

- **AI Skill Gap Analysis** — select a technology, tick completed topics, get a dynamic AI report
- **Personalized Learning Roadmap** — Beginner → Intermediate → Advanced → Industry Ready timeline
- **Resume Analysis** — upload a PDF, get ATS score, strengths, weak sections, and fixes
- **Project Recommendations** — projects matched to your level with duration and outcomes
- **Interview Preparation** — technical questions, HR questions, coding challenges, MCQs
- **Dashboard** — skill level, progress bars, scores, and history
- **JWT Authentication** — secure register/login with hashed passwords

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, JavaScript, CSS3, React Router DOM, Axios, Lucide React |
| Backend | Python, FastAPI, Pydantic |
| AI | Groq API, LangChain, Prompt Engineering |
| Database | PostgreSQL, ChromaDB (vector database for semantic retrieval) |
| Auth | JWT |
| Deployment | Docker, docker-compose, GitHub Actions |

## Project Structure

```
AI-SKILL-GAP-AGENT/
├── backend/          # FastAPI app (api, agents, prompts, services, vectorstore, models, schemas)
├── frontend/         # React (Vite) app (components, pages, services, hooks, context)
├── docs/
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## Quick Start (Docker — recommended)

1. Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
JWT_SECRET_KEY=a_long_random_secret
```

2. Build and run everything (PostgreSQL + backend + frontend):

```bash
docker compose up --build
```

3. Open the app at **http://localhost:3000** (API at http://localhost:8000, docs at http://localhost:8000/docs).

## Local Development (without Docker)

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add your GROQ_API_KEY
uvicorn app.main:app --reload --port 8000
```

By default the backend uses SQLite locally; set `DATABASE_URL` to a PostgreSQL URL for production.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 — the dev server proxies `/api` to the backend on port 8000.

## Environment Variables

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | Your Groq API key (required for AI features) |
| `GROQ_MODEL` | Groq model name (default: `llama-3.3-70b-versatile`) |
| `DATABASE_URL` | PostgreSQL connection string (SQLite fallback for local dev) |
| `JWT_SECRET_KEY` | Secret used to sign JWT tokens |
| `CHROMA_PERSIST_DIR` | Directory for ChromaDB persistence |
| `CORS_ORIGINS` | Comma-separated list of allowed origins |

## API Overview

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/register` | POST | Create account, returns JWT |
| `/api/auth/login` | POST | Login, returns JWT |
| `/api/auth/me` | GET | Current user profile |
| `/api/skills/technologies` | GET | Technologies + topic checklists |
| `/api/skills/analyze` | POST | AI skill gap analysis |
| `/api/skills/roadmap` | POST | AI learning roadmap |
| `/api/skills/projects` | POST | AI project recommendations |
| `/api/skills/interview` | POST | AI interview preparation |
| `/api/resume/analyze` | POST | Resume PDF upload + AI review |
| `/api/reports/dashboard` | GET | Dashboard statistics |

## Security

- Passwords hashed with bcrypt
- JWT bearer authentication on all protected endpoints
- Pydantic validation on every request
- Secure PDF upload validation (type + size limits)
- CORS configuration and environment-based secrets
