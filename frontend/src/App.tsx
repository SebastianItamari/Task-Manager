import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import TaskInput from "./components/TaskInput";
import Loader from "./components/Loader";
import "./App.css";
import type { Task } from "./types/Task";
import EmptyState from "./components/EmptyState";
import { addTask, deleteTask, getTasks, updateTask } from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = () => {
    return getTasks()
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

  const loadTasks = () => {
    setIsLoading(true);

    fetchTasks()
      .catch((error) => {
        console.error("Error al obtener las tareas:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddTask = (newTask: Task) => {
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

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="app-shell">
      {isLoading ? <Loader /> : null}
      <div className="app-frame">
        <Header tasks={tasks} />
        <main className="app-content">
          <TaskInput onAddTask={handleAddTask} isLoading={isLoading} />
          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <TaskList
              tasks={tasks}
              onDeleteTask={handleDeleteTask}
              onToggleCompleted={handleToggleCompleted}
              isLoading={isLoading}
            />
          )}
        </main>
        <Footer taskList={tasks} />
      </div>
    </div>
  );
}

export default App;
