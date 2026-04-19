# PrepAI — AI-Powered Technical Interview Preparation Platform

> A full-stack SaaS application that helps software engineers prepare for technical interviews using AI-generated questions, real-time feedback, and progress tracking.

**Live Demo → [nsdd-prepai.vercel.app](https://nsdd-prepai.vercel.app/)**

---

## Demo Credentials

Try the app instantly — no sign-up required:

| Field | Value |
|-------|-------|
| **Email** | `demo@prep.ai` |
| **Password** | `demo1234` |

---

## Overview

PrepAI simulates real technical interview conditions and uses AI to evaluate your answers the way a senior engineer would. Users select a role and difficulty, answer 5 AI-generated questions, then receive per-question scoring with strengths, weaknesses, and a model answer for each response. All sessions are saved and can be reviewed at any time.

The project was built as a complete, production-grade SaaS product — not a tutorial app — with authentication, protected routes, dark/light theming, responsive design, and a polished component system.

---

## Features

- **AI Interview Sessions** — Generates 5 role-specific questions per session using GPT-3.5. Falls back to a curated question bank (45 questions across 3 roles × 3 difficulty levels) when no API key is present.
- **Answer Evaluation** — Each answer is scored out of 10 with structured feedback: overall assessment, specific strengths, areas to improve, and a model answer.
- **Role Tracks** — Frontend, Backend, and Full Stack — each with distinct question domains.
- **Difficulty Levels** — Easy, Medium, and Hard, calibrated for junior through senior engineers.
- **Session History** — All completed sessions are persisted and viewable with full Q&A breakdowns and per-question scores.
- **Progress Dashboard** — Displays total sessions, average score, personal best, and recent activity at a glance.
- **User Profiles** — Editable name and bio, with stats summarized by track.
- **Authentication** — JWT-based auth with protected routes, 30-day token expiry, and auto-logout on token expiry.
- **Dark / Light Mode** — System-aware theme toggle with preference saved to localStorage.
- **Responsive Design** — Fully usable on mobile, tablet, and desktop.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI library with hooks-based architecture |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling with dark mode support |
| React Router v6 | Client-side routing and protected routes |
| Axios | HTTP client with request/response interceptors |
| Context API | Global state for auth, theme, and toast notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express | REST API framework |
| MongoDB Atlas | Cloud-hosted NoSQL database |
| Mongoose | ODM for schema definition and validation |
| JSON Web Tokens | Stateless authentication |
| bcryptjs | Password hashing |
| OpenAI SDK | GPT-3.5 question generation and answer evaluation |

### Infrastructure
| Service | Purpose |
|---------|---------|
| GitHub | Version control and CI/CD trigger |
| Render | Backend hosting (auto-deploys on push) |
| Vercel | Frontend hosting via global CDN (auto-deploys on push) |
| MongoDB Atlas | Database hosting |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client (Vercel)                      │
│   React + Vite + Tailwind CSS                           │
│   AuthContext · ThemeContext · ToastContext              │
│   9 Pages · Protected & Public routes                   │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS (Axios)
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   API Server (Render)                    │
│   Node.js + Express                                     │
│   JWT Middleware · CORS · Input Validation              │
│   /api/auth  ·  /api/interview                          │
└──────────┬──────────────────────────┬───────────────────┘
           │                          │
           ▼                          ▼
┌─────────────────┐       ┌──────────────────────┐
│  MongoDB Atlas  │       │     OpenAI API        │
│  Users          │       │  GPT-3.5-turbo        │
│  Sessions       │       │  Question generation  │
└─────────────────┘       │  Answer evaluation    │
                          └──────────────────────┘
```

---

## Project Structure

```
prepai/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Register, login, profile
│   │   └── interviewController.js# Start, evaluate, save, history
│   ├── middleware/
│   │   └── auth.js               # JWT verification middleware
│   ├── models/
│   │   ├── User.js               # User schema (bcrypt hashing)
│   │   └── Session.js            # Session + nested question schema
│   ├── routes/
│   │   ├── auth.js
│   │   └── interview.js
│   ├── services/
│   │   └── aiService.js          # OpenAI integration + mock fallback
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Toast.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   ├── ProtectedRoute.jsx # Auth guard + PublicOnlyRoute
    │   │   └── ScoreRing.jsx      # Animated SVG score ring
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   ├── ThemeContext.jsx
    │   │   └── ToastContext.jsx
    │   ├── pages/
    │   │   ├── Landing.jsx        # Marketing homepage
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── InterviewSetup.jsx
    │   │   ├── InterviewSession.jsx
    │   │   ├── Results.jsx
    │   │   ├── History.jsx
    │   │   └── Profile.jsx
    │   └── services/
    │       └── api.js             # Axios instance + interceptors
    └── .env.example
```

---

## Local Setup

### Prerequisites
- Node.js v18+
- A MongoDB Atlas account (free tier works)
- An OpenAI API key (optional — mock AI is used without one)

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/prepai.git
cd prepai
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key   # optional
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `GET` | `/api/auth/profile` | Get current user profile |
| `PUT` | `/api/auth/profile` | Update name and bio |

### Interview
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/interview/start` | Generate 5 questions |
| `POST` | `/api/interview/answer` | Evaluate a single answer |
| `POST` | `/api/interview/save` | Persist completed session |
| `GET` | `/api/interview/history` | Get all user sessions |
| `GET` | `/api/interview/history/:id` | Get a specific session |

---

## Author

Built by **Nitin Sonu** — [nitinsonu.dev](https://nitinsonu.dev) · [LinkedIn](https://linkedin.com/in/nsdotdev) · [GitHub](https://github.com/nsdotdev)
