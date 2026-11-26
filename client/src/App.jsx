import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import api from "./services/api";
import Register from "./components/Register";

const initialTasks = [
  {
    id: 1,
    title: "Design homepage",
    project: "Website Redesign",
    status: "Completed",
    priority: "High",
  },
  {
    id: 2,
    title: "Build authentication",
    project: "Mobile App",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 3,
    title: "Prepare project report",
    project: "Marketing",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: 4,
    title: "Review user feedback",
    project: "Website Redesign",
    status: "In Progress",
    priority: "Low",
  },
];

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    priority: "Medium",
    dueDate: "",
  });

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthLoading(false);

        return;
      }

      try {
        const response = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setAuthLoading(false);
      }
    };

    checkLogin();
  }, []);
  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      setDataLoading(true);
      setDataError("");

      try {
        const [projectResponse, taskResponse] = await Promise.all([
          api.get("/projects"),
          api.get("/tasks"),
        ]);

        setProjects(projectResponse.data);
        setTasks(taskResponse.data);

        if (user.role === "admin") {
          const userResponse = await api.get("/auth/users");
          setUsers(userResponse.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        setDataError(
          error.response?.data?.message || "Unable to load projects and tasks.",
        );
      } finally {
        setDataLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);
  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/projects", projectForm);

      setProjects((prevProjects) => [
        response.data.project || response.data,
        ...prevProjects,
      ]);

      setProjectForm({
        name: "",
        description: "",
        dueDate: "",
      });

      setShowProjectForm(false);
      alert("Project created successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create project.");
    }
  };
  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", taskForm);

      const response = await api.get("/tasks");
      setTasks(response.data);

      setTaskForm({
        title: "",
        description: "",
        project: "",
        assignedTo: "",
        priority: "Medium",
        dueDate: "",
      });

      setShowTaskForm(false);
      alert("Task assigned successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to assign task.");
    }
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const completed = tasks.filter((task) => task.status === "Completed").length;
  const inProgress = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;
  const pending = tasks.filter((task) => task.status === "Pending").length;

  const filteredTasks =
    activeFilter === "All"
      ? tasks
      : tasks.filter((task) => task.status === activeFilter);

  const toggleTask = async (id) => {
    const task = tasks.find((item) => item._id === id);

    if (!task) return;

    const newStatus = task.status === "Completed" ? "In Progress" : "Completed";

    try {
      await api.patch(`/tasks/${id}/status`, {
        status: newStatus,
      });

      setTasks((current) =>
        current.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (error) {
      setDataError(
        error.response?.data?.message || "Unable to update task status.",
      );
    }
  };

  if (authLoading) {
    return <div>Loading TeamSpace...</div>;
  }

  if (!user) {
    return showRegister ? (
      <Register
        onLogin={handleLogin}
        onShowLogin={() => setShowRegister(false)}
      />
    ) : (
      <Login
        onLogin={handleLogin}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }
  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">
          Team<span>Space.</span>
        </h2>

        <p className="menu-label">WORKSPACE</p>
        <nav>
          <a className="nav-link active" href="#dashboard">
            ▦ Dashboard
          </a>
          <a className="nav-link" href="#projects">
            ▤ Projects
          </a>
          <a className="nav-link" href="#tasks">
            ✓ My Tasks
          </a>
          <a className="nav-link" href="#team">
            ♧ Team Members
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{user.name}</strong>
            <small>{user.role}</small>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / Dashboard</p>
            <h1>Dashboard</h1>
          </div>
          <div className="topbar-right">
            <span className="notification">♧</span>
            <span className="today">My Workspace</span>
          </div>
        </header>

        <section className="welcome">
          <div>
            <p>MONDAY, YOUR WORKSPACE</p>
            <h2>Welcome back! 👋</h2>
            <span>Here's what's happening with your projects today.</span>
          </div>
          <div className="welcome-decoration">✦</div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Tasks</span>
            <h2>{tasks.length}</h2>
            <small>All assigned tasks</small>
          </div>
          <div className="stat-card">
            <span>Completed</span>
            <h2>{completed}</h2>
            <small>Successfully finished</small>
          </div>
          <div className="stat-card">
            <span>In Progress</span>
            <h2>{inProgress}</h2>
            <small>Currently working on</small>
          </div>
          <div className="stat-card">
            <span>Pending</span>
            <h2>{pending}</h2>
            <small>Waiting to start</small>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div>
              <h2>My Projects</h2>
              <p>Keep track of your team's progress.</p>
            </div>
            <button
              className="primary-button"
              onClick={() => setShowProjectForm(true)}
            >
              + New Project
            </button>
            {user.role === "admin" && (
              <button
                className="primary-button"
                onClick={() => setShowTaskForm(true)}
              >
                + Assign Task
              </button>
            )}
          </div>
          {showProjectForm && (
            <form className="project-form" onSubmit={handleCreateProject}>
              <h3>Create New Project</h3>

              <input
                type="text"
                placeholder="Project name"
                value={projectForm.name}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, name: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Project description"
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value,
                  })
                }
                required
              />

              <input
                type="date"
                value={projectForm.dueDate}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, dueDate: e.target.value })
                }
              />

              <button type="submit" className="primary-button">
                Create Project
              </button>

              <button type="button" onClick={() => setShowProjectForm(false)}>
                Cancel
              </button>
            </form>
          )}
          {showTaskForm && user.role === "admin" && (
            <form className="project-form" onSubmit={handleCreateTask}>
              <h3>Assign New Task</h3>

              <input
                type="text"
                placeholder="Task title"
                value={taskForm.title}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, title: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Task description"
                value={taskForm.description}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, description: e.target.value })
                }
              />

              <select
                value={taskForm.project}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, project: e.target.value })
                }
                required
              >
                <option value="">Select project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>

              <select
                value={taskForm.assignedTo}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, assignedTo: e.target.value })
                }
                required
              >
                <option value="">Select team member</option>
                {users
                  .filter((member) => member.role === "member")
                  .map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name}
                    </option>
                  ))}
              </select>

              <select
                value={taskForm.priority}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, priority: e.target.value })
                }
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>

              <input
                type="date"
                value={taskForm.dueDate}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, dueDate: e.target.value })
                }
              />

              <button type="submit" className="primary-button">
                Assign Task
              </button>

              <button type="button" onClick={() => setShowTaskForm(false)}>
                Cancel
              </button>
            </form>
          )}
          <div className="project-grid">
            {projects.length === 0 ? (
              <p>No projects available yet.</p>
            ) : (
              projects.map((project) => {
                const projectTasks = tasks.filter(
                  (task) =>
                    String(task.project?._id || task.project) ===
                    String(project._id),
                );

                const completedTasks = projectTasks.filter(
                  (task) => task.status === "Completed",
                ).length;

                const progress = projectTasks.length
                  ? Math.round((completedTasks / projectTasks.length) * 100)
                  : 0;

                return (
                  <div className="project-card" key={project._id}>
                    <div className="project-icon purple">
                      {project.name.charAt(0).toUpperCase()}
                    </div>

                    <span className="project-status">{project.status}</span>

                    <h3>{project.name}</h3>
                    <p>{project.description}</p>

                    <div className="progress-label">
                      <span>Progress</span>
                      <strong>{progress}%</strong>
                    </div>

                    <div className="progress-bar">
                      <div style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="tasks-section" id="tasks">
          <div className="section-heading">
            <div>
              <h2>Recent Tasks</h2>
              <p>Manage and track your assigned tasks.</p>
            </div>
            <select
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value)}
              className="task-filter"
            >
              <option>All</option>
              <option>Completed</option>
              <option>In Progress</option>
              <option>Pending</option>
            </select>
          </div>

          <div className="task-list">
            {dataLoading ? (
              <p>Loading tasks...</p>
            ) : dataError ? (
              <p className="login-error">{dataError}</p>
            ) : filteredTasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              filteredTasks.map((task) => (
                <div className="task-row" key={task._id}>
                  <div className="task-info">
                    <button
                      className={`task-check ${
                        task.status === "Completed" ? "checked" : ""
                      }`}
                      onClick={() => toggleTask(task._id)}
                      aria-label={`Toggle ${task.title}`}
                    >
                      {task.status === "Completed" ? "✓" : ""}
                    </button>

                    <div>
                      <strong>{task.title}</strong>
                      <small>{task.project?.name || "No project"}</small>
                    </div>
                  </div>

                  <span
                    className={`status ${task.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {task.status}
                  </span>

                  <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
        {user.role === "admin" && (
          <section className="tasks-section" id="team">
            <div className="section-heading">
              <div>
                <h2>Team Members</h2>
                <p>Manage your registered team members.</p>
              </div>
            </div>

            <div className="task-list">
              {users.filter((member) => member.role === "member").length ===
              0 ? (
                <p>No team members registered yet.</p>
              ) : (
                users
                  .filter((member) => member.role === "member")
                  .map((member) => (
                    <div className="task-row" key={member._id}>
                      <div className="task-info">
                        <div className="profile-avatar">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong>{member.name}</strong>
                          <small>{member.email}</small>
                        </div>
                      </div>
                      <span className="status completed">Member</span>
                    </div>
                  ))
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
