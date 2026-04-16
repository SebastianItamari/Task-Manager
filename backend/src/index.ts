// Load evironment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const cors = require("cors"); // Allow cross-origin requests

// Import Prisma Client and Adapter
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

// Create the adapter using the connection URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

// Create a new Prisma Client instance with the adapter
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("¡El backend está funcionando!");
});

// To get all tasks
app.get("/tasks", async (req: any, res: any) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        id: "asc"
      }
    });
    res.json(tasks);
  } catch (error) {
    console.error("Error en GET /tasks:", error);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
});

// To create a new task
app.post("/tasks", async (req: any, res: any) => {
  try {
    const newTask = await prisma.task.create({
      data: {
        title: req.body.title,
        completed: false
      }
    });

    res.json(newTask);
  } catch (error) {
    console.error("Error en POST /tasks:", error);
    res.status(500).json({ message: "Error al crear la tarea" });
  }
});

// To update a task
app.put("/tasks/:id", async (req: any, res: any) => {
  try {
    const taskId = Number(req.params.id);

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        completed: req.body.completed
      }
    });

    res.json(updatedTask);
  } catch (error) {
    console.error("Error en PUT /tasks/:id:", error);
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
});

// To delete a task
app.delete("/tasks/:id", async (req: any, res: any) => {
  try {
    const taskId = Number(req.params.id);

    const deletedTask = await prisma.task.delete({
      where: { id: taskId }
    });

    res.json({ message: "Tarea eliminada", deletedTask });
  } catch (error) {
    console.error("Error en DELETE /tasks/:id:", error);
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});