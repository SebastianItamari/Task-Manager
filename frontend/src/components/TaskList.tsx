import type { Task } from "../types/Task";
import EmptyState from "./EmptyState";
import TaskCard from "./TaskCard";
import styles from "./TaskList.module.css";

type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (id: number) => Promise<void>;
  onToggleCompleted: (id: number, task: Task) => Promise<void>;
  onUpdateTask: (id: number, updatedTask: Partial<Task>) => Promise<void>;
  isLoading: boolean;
};

function TaskList({
  tasks,
  onDeleteTask,
  onToggleCompleted,
  onUpdateTask,
  isLoading,
}: TaskListProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Tareas</h2>

      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className={styles.list}>
          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              onDelete={() => onDeleteTask(task.id)}
              onToggleCompleted={() => onToggleCompleted(task.id, task)}
              onUpdate={(updatedTask) => onUpdateTask(task.id, updatedTask)}
              isLoading={isLoading}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
