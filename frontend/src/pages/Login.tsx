import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styles from "./Login.module.css";
import Loader from "../components/Loader";

const Login = () => {
  const { handleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await handleLogin(email, password);
      window.location.href = "/";
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className={styles.loginContainer}>
      {isLoading ? <Loader /> : null}
      <div className={styles.loginCard}>
        <span className={styles.subtitle}>TASK MANAGER</span>
        <h2 className={styles.title}>Iniciar sesión</h2>

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

          <button className={styles.button} type="submit">
            Ingresar
          </button>
        </form>
        <p className={styles.registerText}>
          ¿No tienes cuenta? <a href="/register" className={styles.link}>
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
