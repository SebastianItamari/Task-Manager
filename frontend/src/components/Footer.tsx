import type { Task } from "../types/Task";
import styles from "./Footer.module.css";

type FooterProps = {
  taskList: Task[];
};

function Footer({ taskList }: FooterProps) {
  const completedTasks = taskList.filter((task) => task.completed).length;
  const pendingTasks = taskList.length - completedTasks;

  return (
    <footer className={styles.footer}>
      <div>
        <span className={styles.counterMessage}>CONTADOR DE TAREAS</span>
      </div>

      <div className={styles.statusRow}>
        <span className={styles.badge}>{taskList.length} tareas totales</span>
        <span className={styles.badge}>{pendingTasks} por hacer</span>
        <span className={styles.badge}>{completedTasks} completadas</span>
      </div>
    </footer>
  );
}

export default Footer;