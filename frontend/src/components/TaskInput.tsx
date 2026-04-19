import { useState } from "react";
import type { Task } from "../types/Task";
import styles from "./TaskInput.module.css";

type TaskInputProps = {
  onAddTask: (newTask: Partial<Task>) => Promise<void>;
  isLoading: boolean;
};

function TaskInput({ onAddTask, isLoading }: TaskInputProps) {

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleAddTask = async () => {
    if (title.trim() === "") {
      alert("Por favor, ingresa una tarea válida.");
      return;
    }

    const newTaskObject = {
      title,
      completed: false,
      deadline: deadline ? new Date(deadline).toISOString() : null,
    };

    try {
      await onAddTask(newTaskObject);
      setTitle("");
      setDeadline("");
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
          value={title}
          disabled={isLoading}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className={styles.input}
          type="datetime-local"
          value={deadline}
          disabled={isLoading}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <button
          className={styles.button}
          onClick={handleAddTask}
          disabled={isLoading}
        >
          Agregar tarea
        </button>
      </div>
    </div>
  );
}

export default TaskInput;
