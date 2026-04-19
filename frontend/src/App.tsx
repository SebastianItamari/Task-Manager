
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TaskApp from "./pages/TaskApp";
import Register from "./pages/Register";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<TaskApp />} />
    </Routes>
  );
}

export default App;

