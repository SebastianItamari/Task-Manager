import type { Task } from "../types/Task";
import styles from "./Header.module.css";

type HeaderProps = {
  tasks: Task[];
};

function Header({ tasks }: HeaderProps) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionRate = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  return (
    <header className={styles.header}>
      <div className={styles.titleBlock}>
        <span className={styles.smallTitle}>TASK MANAGER</span>
        <h1 className={styles.mainTitle}>Lista de tareas</h1>
      </div>

      <div className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <span className={styles.metricLabel}>PROGRESO</span>
          <strong className={styles.metricValue}>{completionRate}%</strong>
        </div>
        <div className={styles.progressTrack} aria-hidden="true">
          <span className={styles.progressFill} style={{ width: `${completionRate}%` }} />
        </div>
      </div>
    </header>
  );
}

export default Header;