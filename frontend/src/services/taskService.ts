import type { Task } from "../types/Task";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function getTasks(): Promise<Response> {
  return fetch(`${API_URL}/tasks`);
}

export function addTask(newTask: Task): Promise<Response> {
  return fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTask)
  });
}

export function updateTask(taskId: number, updatedTask: Task): Promise<Response> {
  return fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedTask)
  });
}

export function deleteTask(taskId: number): Promise<Response> {
  return fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE"
  });
}