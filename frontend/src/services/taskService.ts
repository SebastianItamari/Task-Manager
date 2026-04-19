import type { Task } from "../types/Task";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: getHeaders(),
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return [];
  }

  return res.json();
};

export const addTask = async (newTask: Partial<Task>) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(newTask),
  });

  return res.json();
};

export const updateTask = async (
  taskId: number,
  updatedTask: Partial<Task>,
) => {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(updatedTask),
  });

  return res.json();
};

export const deleteTask = async (taskId: number) => {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return res.json();
};
