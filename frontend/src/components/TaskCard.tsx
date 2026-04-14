import type { Task } from "../types/Task";
import styles from "./TaskCard.module.css";

type TaskCardProps = {
  task: Task;
  onDelete: () => void;
  onToggleCompleted: () => void;
  isLoading: boolean;
};

function TaskCard({ task, onDelete, onToggleCompleted, isLoading }: TaskCardProps) {
  return (
    <li className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={task.completed ? styles.statusDone : styles.statusPending}>
          {task.completed ? "Completeda" : "En progreso"}
        </span>

        <button className={styles.deleteButton} onClick={onDelete} type="button" disabled={isLoading}>
          Eliminar
        </button>
      </div>

      <p className={task.completed ? styles.taskDone : styles.taskText}>
        {task.title}
      </p>

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
            {task.completed ? "Marcar como pendiente" : "Marcar como completada"}
          </span>
        </label>
      </div>
    </li>
  );
}

export default TaskCard;
