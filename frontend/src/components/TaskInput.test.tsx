import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskInput from "./TaskInput";

describe("TaskInput", () => {
  it("calls onAddTask with the text typed by the user", async () => {
    const onAddTask = vi.fn().mockResolvedValue(undefined);
    render(<TaskInput onAddTask={onAddTask} isLoading={false} />);
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText("Ej. Elaborar el proyecto final");
    await user.type(input, "Comprar pan");
    await user.click(screen.getByText("Agregar tarea"));

    expect(onAddTask).toHaveBeenCalledWith({
      title: "Comprar pan",
      completed: false,
      deadline: null,
    });
  });

  it("does not call onAddTask when the title is empty", async () => {
    const onAddTask = vi.fn();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<TaskInput onAddTask={onAddTask} isLoading={false} />);
    const user = userEvent.setup();

    await user.click(screen.getByText("Agregar tarea"));

    expect(onAddTask).not.toHaveBeenCalled();
  });
});
