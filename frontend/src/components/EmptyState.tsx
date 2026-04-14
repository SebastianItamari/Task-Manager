import styles from "./EmptyState.module.css";

function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <span className={styles.icon}>+</span>
      <h3 className={styles.title}>Aún no hay tareas</h3>
      <p className={styles.description}>
        ¡Agrega una nueva!
      </p>
    </div>
  );
}

export default EmptyState;