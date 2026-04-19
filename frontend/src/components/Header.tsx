import type { Task } from "../types/Task";
import styles from "./Header.module.css";

type HeaderProps = {
  tasks: Task[];
  onLogout: () => void;
};

function Header({ tasks, onLogout }: HeaderProps) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const completedTasks = safeTasks.filter((t) => t.completed).length;
  const completionRate =
    safeTasks.length === 0
      ? 0
      : Math.round((completedTasks / safeTasks.length) * 100);

  return (
    <header className={styles.header}>
  <div className={styles.titleBlock}>
    <span className={styles.smallTitle}>TASK MANAGER</span>
    <h1 className={styles.mainTitle}>Lista de tareas</h1>
  </div>

  <div className={styles.actions}>
    <div className={styles.progressCard}>
      <div className={styles.progressHeader}>
        <span className={styles.metricLabel}>PROGRESO</span>
        <strong className={styles.metricValue}>{completionRate}%</strong>
      </div>
      <div className={styles.progressTrack} aria-hidden="true">
        <span
          className={styles.progressFill}
          style={{ width: `${completionRate}%` }}
        />
      </div>
    </div>

    <button onClick={onLogout} className={styles.logout}>
      Cerrar sesión
    </button>
  </div>
</header>
  );
}

export default Header;


