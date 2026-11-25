const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");

// Create a task (Admin only)
const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, priority, dueDate } =
      req.body;

    if (!title || !project || !assignedTo) {
      return res.status(400).json({
        message: "Title, project, and assigned member are required",
      });
    }

    const projectExists = await Project.findById(project);
    const member = await User.findById(assignedTo);

    if (!projectExists) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!member || member.role !== "member") {
      return res.status(400).json({
        message: "Please assign the task to a valid member",
      });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      assignedBy: req.user._id,
      priority,
      dueDate,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tasks
const getTasks = async (req, res) => {
  try {
    const filter =
      req.user.role === "admin" ? {} : { assignedTo: req.user._id };

    const tasks = await Task.find(filter)
      .populate("project", "name")
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one task
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("project", "name")
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (
      req.user.role !== "admin" &&
      task.assignedTo._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task (Admin only)
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task status (Assigned member only)
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete task (Admin only)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
