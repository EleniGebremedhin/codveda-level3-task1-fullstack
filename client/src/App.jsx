import { useState } from "react";
import "./App.css";

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
  const [tasks, setTasks] = useState(initialTasks);
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

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Completed" ? "In Progress" : "Completed",
            }
          : task,
      ),
    );
  };

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
          <div className="profile-avatar">EG</div>
          <div>
            <strong>Workspace User</strong>
            <small>Team Member</small>
          </div>
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
            <button className="primary-button">+ New Project</button>
          </div>

          <div className="project-grid">
            <div className="project-card">
              <div className="project-icon purple">W</div>
              <span className="project-status">Active</span>
              <h3>Website Redesign</h3>
              <p>Redesigning the company website.</p>
              <div className="progress-label">
                <span>Progress</span>
                <strong>75%</strong>
              </div>
              <div className="progress-bar">
                <div style={{ width: "75%" }} />
              </div>
            </div>

            <div className="project-card">
              <div className="project-icon pink">M</div>
              <span className="project-status">Active</span>
              <h3>Mobile Application</h3>
              <p>Building a new mobile experience.</p>
              <div className="progress-label">
                <span>Progress</span>
                <strong>45%</strong>
              </div>
              <div className="progress-bar">
                <div style={{ width: "45%" }} />
              </div>
            </div>

            <div className="project-card">
              <div className="project-icon blue">A</div>
              <span className="project-status">Active</span>
              <h3>Marketing Campaign</h3>
              <p>Planning our upcoming campaign.</p>
              <div className="progress-label">
                <span>Progress</span>
                <strong>30%</strong>
              </div>
              <div className="progress-bar">
                <div style={{ width: "30%" }} />
              </div>
            </div>
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
            {filteredTasks.map((task) => (
              <div className="task-row" key={task.id}>
                <div className="task-info">
                  <button
                    className={`task-check ${task.status === "Completed" ? "checked" : ""}`}
                    onClick={() => toggleTask(task.id)}
                    aria-label={`Toggle ${task.title}`}
                  >
                    {task.status === "Completed" ? "✓" : ""}
                  </button>
                  <div>
                    <strong>{task.title}</strong>
                    <small>{task.project}</small>
                  </div>
                </div>
                <span
                  className={`status ${task.status.toLowerCase().replace(" ", "-")}`}
                >
                  {task.status}
                </span>
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
