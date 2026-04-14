import type { Task } from "../types/Task";

export function getTasks(): Promise<Response> {
  return fetch("http://localhost:3000/tasks");
}

export function addTask(newTask: Task): Promise<Response> {
  return fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTask)
  });
}

export function updateTask(taskId: number, updatedTask: Task): Promise<Response> {
  return fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedTask)
  });
}

export function deleteTask(taskId: number): Promise<Response> {
  return fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: "DELETE"
  });
}