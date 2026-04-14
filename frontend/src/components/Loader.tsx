import styles from "./Loader.module.css";

type LoaderProps = {
  message?: string;
};

function Loader({ message = "Procesando..." }: LoaderProps) {
  return (
    <div className={styles.overlay} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.card}>
        <span className={styles.spinner} aria-hidden="true" />
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}

export default Loader;
