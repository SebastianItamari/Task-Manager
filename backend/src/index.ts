const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());


// Initial tasks
let tasks = [
  { id: 1776128748288, title: "Estudiar Express", completed: false },
  { id: 1776128748289, title: "Construir backend", completed: true }
];

app.get("/", (req: any, res: any) => {
  res.send("¡El backend está funcionando!");
});

// To get all tasks
app.get("/tasks", (req: any, res: any) => {
  res.json(tasks);
});

// To create a new task
app.post("/tasks", (req: any, res: any) => {
  const newTask = {
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed
  };

  tasks.push(newTask);
  res.json(newTask);
});

// To update a task
app.put("/tasks/:id", (req: any, res: any) => {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.json(tasks[taskIndex]);
});

// To delete a task
app.delete("/tasks/:id", (req: any, res: any) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  tasks = tasks.filter((task) => task.id !== taskId);
  res.json({ message: "Tarea eliminada", deletedTask: task });
});

// Start the server
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});