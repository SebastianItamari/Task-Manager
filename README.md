# Task Manager

This project is a full-stack web application designed to help users organize, track, and manage tasks efficiently. It includes secure user authentication (login and registration) and supports optional deadlines for tasks, allowing flexible scheduling and prioritization.

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
  
  > ℹ️ *The value “http://localhost:3000” is commonly used.*

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
   ```
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
