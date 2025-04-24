const db = require("../store/db");

const getTask = (req, res) => {
  const userId = req.userId;
  const userTasks = db.tasks[userId] || [];
  res.status(200).json(userTasks);
};

const addTask = (req, res) => {
  const userId = req.userId;
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Please Fill All Details" });
  }
  const newTask = {
    id: Date.now().toString(),
    title,
  };
  db.tasks[userId] = db.tasks[userId] || [];
  db.tasks[userId].push(newTask);
  res.status(201).json({ message: "Task Added Successfully" });
};

const deleteTask = (req, res) => {
  const userId = req.userId;
  const taskId = req.params.id;

  const userTasks = db.tasks[userId] || [];
  const taskIndex = userTasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task Not Found" });
  }

  userTasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Task Deleted Successfully" });   
};

module.exports = {
    getTask,
    addTask,
    deleteTask, 
}