import type { Task } from "../types/Task";
import styles from "./TaskCard.module.css";
import { useState } from "react";


type TaskCardProps = {
  task: Task;
  onDelete: () => void;
  onToggleCompleted: () => void;
  onUpdate: (updatedTask: Partial<Task>) => Promise<void>;
  isLoading: boolean;
};

function TaskCard({
  task,
  onDelete,
  onToggleCompleted,
  isLoading,
  onUpdate,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = async () => {
    if (!editTitle.trim()) return;

    await onUpdate({
      title: editTitle,
    });

    setIsEditing(false);
  };
  const isLate = task.deadline && new Date(task.deadline) < new Date();

  return (
    <li className={styles.card}>
      <div className={styles.cardHeader}>
        <span
          className={task.completed ? styles.statusDone : styles.statusPending}
        >
          {task.completed ? "Completada" : "En progreso"}
        </span>

        <button
          type="button"
          className={styles.editButton}
          onClick={() => setIsEditing(!isEditing)}
          disabled={isLoading}
        >
          Editar
        </button>

        <button
          className={styles.deleteButton}
          onClick={onDelete}
          type="button"
          disabled={isLoading}
        >
          Eliminar
        </button>
      </div>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            className={styles.input}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") setIsEditing(false);
            }}
          />
          <button className={styles.editButton} onClick={handleSave}>Guardar</button>
          <button className={styles.editButton} onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <>
          <p className={task.completed ? styles.taskDone : styles.taskText}>
            {task.title}
          </p>

          {task.deadline && (
            <span
              className={styles.deadline}
              style={{ color: isLate ? "red" : "#aaa" }}
            >
              📅 Fecha Limite de Cumplimiento {new Date(task.deadline).toLocaleString()}
            </span>
          )}
        </>
      )}
      <div className={styles.cardFooter}>
        <label className={styles.toggle}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={task.completed}
            disabled={isLoading}
            onChange={onToggleCompleted}
          />
          <span className={styles.checkmark} aria-hidden="true" />
          <span className={styles.toggleLabel}>
            {task.completed
              ? "Marcar como pendiente"
              : "Marcar como completada"}
          </span>
        </label>
      </div>
    </li>
  );
}

export default TaskCard;
