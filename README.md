# Task Manager

This project is a full-stack web application designed to help users organize, track, and manage tasks efficiently. It includes secure user authentication (login and registration) and supports optional deadlines for tasks, allowing flexible scheduling and prioritization.

[![CI](https://github.com/SebastianItamari/Task-Manager/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/SebastianItamari/Task-Manager/actions/workflows/ci.yml)

<p align="center">
  <img width="1455" height="906" alt="Task-Manager" src="https://github.com/user-attachments/assets/6c49624f-f2bd-4ab0-8b05-ff2194b833c6" />
</p>

## Tech Stack 🛠️
- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Deployment:** Vercel (frontend) + Render (backend and database)

## Getting Started 🚀

### Prerequisites
- Node.js 20 or later
- npm 10 or later
- PostgreSQL

## Set Up ⚙️

### Clone the repository
```bash
git clone https://github.com/SebastianItamari/Task-Manager.git
cd Task-Manager
```

### Frontend
1. Move into the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside `frontend/` with:
   ```env
   VITE_API_URL="backend-url"
   ```

   > ℹ️ *`VITE_API_URL` is the base URL of the backend API.*
   > *For local development, use `http://localhost:3000` (or the `PORT` you will set in the backend `.env`). In production, use the backend URL deployed on Render.*

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Backend
1. Move into the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside `backend/` with:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
   JWT_SECRET="your-secret-key"
   PORT=
   ```

   > ℹ️ *If `PORT` is left empty, the backend defaults to `3000`.*
4. Run the database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```

### Run Both
Use two terminals:
- Terminal 1: run the backend from `backend/`
- Terminal 2: run the frontend from `frontend/`

## Run with Docker 🐳

Instead of setting up Node, npm and PostgreSQL manually, you can run the whole stack (frontend, backend and database) with a single command using Docker Compose.

### Prerequisites
- Docker and Docker Compose installed.

### 1. Configure environment variables
Copy the template and fill in the values:
```bash
cp .env.example .env
```

`.env.example` (at the project root) documents every variable `docker-compose.yml` needs. The real `.env` is git-ignored — it ends up holding real credentials, even if only for local development.

| Variable | Used for | Suggested default |
| --- | --- | --- |
| `POSTGRES_USER` | Database user | `appuser` |
| `POSTGRES_PASSWORD` | Database password | — |
| `POSTGRES_DB` | Database name | `appdb` |
| `JWT_SECRET` | Secret used by the backend to sign session tokens | — |
| `BACKEND_PORT` | Host port the backend is published on | `3000` |
| `FRONTEND_PORT` | Host port the frontend is published on | `5173` |
| `POSTGRES_PORT` | Host port Postgres is published on | `5432` |

The last three are optional — if you don't set them, `docker-compose.yml` falls back to those same defaults. Only override them if something else on your machine is already using that port (e.g. a local Postgres install on `5432`).

### 2. Start everything
```bash
docker compose up --build
```

This builds the `frontend` and `backend` images, starts Postgres, waits for it to be healthy, applies Prisma migrations automatically, and starts the backend and frontend.

- Frontend: `http://localhost:<FRONTEND_PORT>` (default `5173`)
- Backend: `http://localhost:<BACKEND_PORT>` (default `3000`)

Add `-d` to run it in the background:
```bash
docker compose up --build -d
```

### 3. Stop everything
```bash
docker compose down
```

Postgres data persists across restarts in a named volume (`postgres_data`). To reset the database from scratch:
```bash
docker compose down -v
```

## 📜 Available Commands

### Backend (`backend/`)
| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Compiles TypeScript to JavaScript (production) |
| `npm test` | Runs automated tests (pending — Session 3) |

### Frontend (`frontend/`)
| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server (Vite) |
| `npm run build` | Generates the production build |
| `npm test` | Runs automated tests (pending — Session 3) |

## API Endpoints 🤖

### Public Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Basic backend health check |
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Authenticate a user and return a JWT |

#### Example Login/Register Payload
```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

### Protected Endpoints
These endpoints require an `Authorization` header with a Bearer token:

```http
Authorization: Bearer <token>
```

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/tasks` | Get all tasks for the authenticated user |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update an existing task |
| `DELETE` | `/tasks/:id` | Delete a task |
| `GET` | `/test/private` | Test token-protected access |

#### Example Task Payload
```json
{
  "title": "Finish README update",
  "completed": false,
  "deadline": "2026-04-30T23:59:59.000Z"
}
```

<!--
## Deployment 🌐
### Database – Render
1. Create an account at [Render](https://render.com/).
2. Create a new **PostgreSQL** instance.
3. Assign a name to the instance.
4. (Optional) Configure the database name and user.
5. Create the database.
6. Once created, copy the **External Database URL** — this will be used in your backend environment variables.

  > ℹ️ *You can use the **Internal Database URL** when deploying the backend on Render in the same region.*

### Backend - Render
1. Create an account at [Render](https://render.com/).
2. Create a new **Web Service** and connect your GitHub repository.
3. Set the **Root Directory** to the `backend` folder.
4. Configure the following commands:
   - **Build Command:**  
     ```bash
     npm install && npm run build
     ```
   - **Start Command:**  
     ```bash
     npm run deploy && npm start
     ```
5. Add environment variables:
   - `DATABASE_URL` → connection string of the database created in Render.  
   - `JWT_SECRET` → secret key to sign and verify JSON Web Tokens (JWT).
6. Deploy the service.

### Frontend - Vercel
1. Create an account at [Vercel](https://vercel.com/).
2. Create a new project and connect it to your GitHub repository.
3. Set the **Root Directory** to the `frontend` folder.
4. Configure the following commands:
   - **Install Command:**  
     ```bash
     npm install
     ```
   - **Build Command:**  
     ```bash
     npm run build
     ```
5. Add an environment variable:
   - `VITE_API_URL` → URL of your backend deployed on Render (without a trailing slash).
6. Deploy the project.
-->

## Authors 🧑‍💻
- [@SebastianItamari](https://github.com/SebastianItamari)
- [@RuniorElio](https://github.com/RuniorElio)
