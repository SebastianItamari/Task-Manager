import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Register() {
  const { handleRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleRegister(email, password);
      window.location.href = "/login";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {isLoading ? <Loader /> : null}
      <div className={styles.loginCard}>
        <span className={styles.subtitle}>TASK MANAGER</span>
        <h2 className={styles.title}>Crear cuenta</h2>

        <form className={styles.form} onSubmit={onSubmit}>
          <input
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className={styles.button}>Registrarse</button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className={styles.backButton}
          >
            ← Volver
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
