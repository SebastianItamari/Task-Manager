const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const prisma = require("../lib/prisma");

// To apply middleware to all routes
router.use(verifyToken);

// To get all tasks
router.get("/", async (req: any, res: any) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: "asc"},
      where: { userId: req.user.userId }
    });
    res.json(tasks);
  } catch (error) {
    console.error("Error en GET /tasks:", error);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
});

// To create a new task
router.post("/", async (req: any, res: any) => {
  try {
    const newTask = await prisma.task.create({
      data: {
        title: req.body.title,
        completed: false,
        deadline: req.body.deadline ? new Date(req.body.deadline) : null,
        userId: req.user.userId
      }
    });

    res.json(newTask);
  } catch (error) {
    console.error("Error en POST /tasks:", error);
    res.status(500).json({ message: "Error al crear la tarea" });
  }
});

// To update a task
router.put("/:id", async (req: any, res: any) => {
  try {
    const taskId = Number(req.params.id);

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: req.body.title,
        completed: req.body.completed,
        deadline: req.body.deadline ? new Date(req.body.deadline) : null
      }
    });

    res.json(updatedTask);
  } catch (error: any) {
    // P2025 is the error code for "Record to delete does not exist in Prisma"
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    console.error("Error en PUT /tasks/:id:", error);
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
});

// To delete a task
router.delete("/:id", async (req: any, res: any) => {
  try {
    const taskId = Number(req.params.id);

    const deletedTask = await prisma.task.delete({
      where: { id: taskId }
    });

    res.json({ message: "Tarea eliminada", deletedTask });
  } catch (error: any) {
    // P2025 is the error code for "Record to delete does not exist in Prisma"
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    console.error("Error en DELETE /tasks/:id:", error);
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
});

// Export the module
module.exports = router;