# TeamSpace – Project & Task Management System

A full-stack web application built with the MERN stack that helps teams organize projects, assign tasks, and track progress through role-based access.

## 🌐 Live Demo

- **Frontend:** https://codveda-level3-task1-fullstack.vercel.app
- **Backend API:** https://teamspace-api-oykq.onrender.com
- **GitHub Repository:** https://github.com/EleniGebremedhin/codveda-level3-task1-fullstack

## 📌 Project Overview

TeamSpace is a project and task management application developed as part of the **Codveda Technologies Level 3 – Task 1 Full-Stack Development Internship**.

The application provides a centralized workspace where administrators can manage projects, assign tasks to team members, and monitor progress. Team members can log in, view their assigned tasks, and update their task statuses.

## ✨ Features

### Authentication and Authorization

- User registration and login.
- Secure password hashing using bcrypt.
- JWT-based authentication.
- Role-based access control (Admin and Member).
- Persistent login sessions.

### Admin Features

- Create and manage projects.
- Assign tasks to team members.
- Set task priorities and due dates.
- View registered team members.
- Monitor project and task progress.
- Access all tasks.

### Member Features

- Register a new member account.
- View assigned tasks.
- View associated projects.
- Update task status.
- Track completed, pending, and in-progress tasks.

### Dashboard

- Overview of total tasks.
- Completed, pending, and in-progress statistics.
- Project progress indicators.
- Task filtering by status.
- Responsive dashboard interface.

## 🛠️ Technologies Used

| Technology    | Purpose              |
| ------------- | -------------------- |
| React.js      | Frontend development |
| Vite          | Frontend build tool  |
| Node.js       | Backend runtime      |
| Express.js    | REST API             |
| MongoDB Atlas | Database             |
| Mongoose      | Database modeling    |
| JWT           | Authentication       |
| bcryptjs      | Password hashing     |
| Axios         | API communication    |
| CSS           | Styling              |
| Git & GitHub  | Version control      |
| Vercel        | Frontend deployment  |
| Render        | Backend deployment   |

## 📂 Project Structure

```text
codveda-level3-task1-fullstack/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       ├── services/
│       │   └── api.js
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
├── server/
│   ├── scripts/
│   │   └── createAdmin.js
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/EleniGebremedhin/codveda-level3-task1-fullstack.git
```

### 2. Navigate to the Project

```bash
cd codveda-level3-task1-fullstack
```

### 3. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

The backend will run at:

`http://localhost:5000`

### 4. Set Up the Frontend

Open another terminal:

```bash
cd client
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will run at:

`http://localhost:5173`

The local frontend uses the Vite proxy to communicate with the backend.

## 🔗 API Endpoints

### Authentication

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/auth/register` | Register a new member        |
| POST   | `/api/auth/login`    | User login                   |
| GET    | `/api/auth/me`       | Get logged-in user           |
| GET    | `/api/auth/users`    | Get registered users (Admin) |

### Projects

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| POST   | `/api/projects`     | Create a project |
| GET    | `/api/projects`     | Get all projects |
| GET    | `/api/projects/:id` | Get a project    |
| PUT    | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

### Tasks

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | `/api/tasks`            | Create and assign a task |
| GET    | `/api/tasks`            | Get tasks                |
| GET    | `/api/tasks/:id`        | Get a specific task      |
| PUT    | `/api/tasks/:id`        | Update a task            |
| PATCH  | `/api/tasks/:id/status` | Update task status       |
| DELETE | `/api/tasks/:id`        | Delete a task            |

Protected endpoints require a valid JWT authentication token.

## 🔐 User Roles

**Admin**

- Manages projects and tasks.
- Assigns tasks to members.
- Views team members.
- Monitors team progress.

**Member**

- Registers and logs in.
- Views assigned tasks.
- Updates task progress.

New registrations automatically receive the Member role.

## 🚀 Deployment

The application is deployed using:

- **Vercel:** React frontend.
- **Render:** Node.js and Express backend.
- **MongoDB Atlas:** Cloud database.

The frontend communicates with the deployed backend through the `VITE_API_URL` environment variable.

## 🔒 Security

- Passwords are hashed before storage.
- JWT protects private API routes.
- Role-based middleware restricts unauthorized actions.
- Environment variables protect database credentials and secret keys.
- Sensitive `.env` files are excluded from Git.

## 🎯 Learning Outcomes

Through this project, I gained practical experience in:

- Building and integrating a full-stack MERN application.
- Developing RESTful APIs using Express.js.
- Connecting applications to MongoDB Atlas.
- Implementing JWT authentication and role-based authorization.
- Managing frontend and backend communication.
- Deploying full-stack applications.
- Using Git and GitHub for version control.

## 👩‍💻 Author

**Eleni Gebremedhin**

Third-Year Software Engineering Student  
Addis Ababa University

**GitHub:** [EleniGebremedhin](https://github.com/EleniGebremedhin)

**LinkedIn:** [Connect with me](https://linkedin.com/in/eleni-gebremedhin-b592a8322)

---

_Developed as part of the Codveda Technologies Full-Stack Development Internship – Level 3, Task 1._
