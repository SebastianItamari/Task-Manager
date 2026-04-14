import { useState } from "react";
import type { Task } from "../types/Task";
import styles from "./TaskInput.module.css";

type TaskInputProps = {
  onAddTask: (newTask: Task) => Promise<void>;
  isLoading: boolean;
};

function TaskInput({ onAddTask, isLoading }: TaskInputProps) {
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = async () => {
    if (newTask.trim() === "") {
      alert("Por favor, ingresa una tarea valida.");
      return;
    }

    const newTaskObject = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    try {
      await onAddTask(newTaskObject);
      setNewTask("");
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  return (
    <div className={styles.panel}>
      <span className={styles.label}>NUEVA TAREA</span>

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="Ej. Elaborar el proyecto final"
          value={newTask}
          disabled={isLoading}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={styles.button} onClick={handleAddTask} disabled={isLoading}>
          Agregar tarea
        </button>
      </div>
    </div>
  );
}

export default TaskInput;
