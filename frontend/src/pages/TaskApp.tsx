import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import Footer from "../components/Footer";
import TaskInput from "../components/TaskInput";
import Loader from "../components/Loader";
import type { Task } from "../types/Task";
import EmptyState from "../components/EmptyState";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/taskService";
 import styles from "./TaskApp.module.css"



function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const data = await getTasks();

    if (!Array.isArray(data)) return;

    setTasks(data);
  };

  const loadTasks = async () => {
    setIsLoading(true);

    try {
      await fetchTasks();
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = (newTask: Partial<Task>) => {
    setIsLoading(true);

    return addTask(newTask)
      .then(() => fetchTasks())
      .catch((error) => {
        console.error("Error al agregar la tarea:", error);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteTask = (id: number) => {
    setIsLoading(true);

    return deleteTask(id)
      .then(() => fetchTasks())
      .catch((error) => {
        console.error(`Error al eliminar la tarea con id: ${id}`, error);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleToggleCompleted = (id: number, task: Task) => {
    setIsLoading(true);

    return updateTask(id, { ...task, completed: !task.completed })
      .then(() => fetchTasks())
      .catch((error) => {
        console.error(`Error al actualizar la tarea con id: ${id}`, error);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleUpdateTask = (id: number, updatedTask: Partial<Task>) => {
    setIsLoading(true);

    return updateTask(id, updatedTask)
      .then(() => fetchTasks())
      .catch((error) => {
        console.error(`Error al actualizar la tarea con id: ${id}`, error);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // si NO hay token y NO estás en login → redirige
    if (!token && window.location.pathname !== "/login") {
      window.location.href = "/login";
      return;
    }

    // si hay token → carga tareas
    if (token) {
      loadTasks();
    }
  }, []);

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app-shell">
      {isLoading ? <Loader /> : null}
      <div className="app-frame">
        <Header tasks={tasks} onLogout={handleLogout} />

        <main className="app-content">
          <div className={styles.filters}>
            <input
              className={styles.search}
              placeholder="Buscar tarea..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className={styles.buttons}>
              <button onClick={() => setFilter("all")}>Todas</button>

              <button onClick={() => setFilter("completed")}>
                Completadas
              </button>

              <button onClick={() => setFilter("pending")}>Pendientes</button>
            </div>
          </div>

          <TaskInput onAddTask={handleAddTask} isLoading={isLoading} />
          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <TaskList
              tasks={filteredTasks}
              onDeleteTask={handleDeleteTask}
              onToggleCompleted={handleToggleCompleted}
              onUpdateTask={handleUpdateTask}
              isLoading={isLoading}
            />
          )}
        </main>
        <Footer taskList={tasks} />
      </div>
    </div>
  );
}
export default TaskApp;
