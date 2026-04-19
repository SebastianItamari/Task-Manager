import { login, register } from "../services/authService";

export const useAuth = () => {

  const handleLogin = async (email: string, password: string) => {
    const data = await login(email, password);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const handleRegister = async (email: string, password: string) => {
  await register(email, password);
};

  return {
    handleLogin,
    handleRegister,
    logout,
    isAuthenticated,
  };
};