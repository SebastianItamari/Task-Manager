process.env.JWT_SECRET = "test-secret";
const express = require("express");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");
const tasksRouter = require("./tasks");
const app = express();
app.use(express.json());
app.use("/tasks", tasksRouter);

function authHeader() {
  const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET as string);
  return `Bearer ${token}`;
}

describe("POST /tasks", () => {
  let createSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    createSpy = vi.fn().mockResolvedValue({
      id: 1,
      title: "test",
      completed: false,
      deadline: null,
      userId: 1,
    });
    prisma.task.create = createSpy;
  });

  it("rejects creating a task with an empty title", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", authHeader())
      .send({ title: "" });

    expect(res.status).toBe(400);
    expect(createSpy).not.toHaveBeenCalled();
  });

  it("rejects creating a task with a whitespace-only title", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", authHeader())
      .send({ title: "   " });

    expect(res.status).toBe(400);
    expect(createSpy).not.toHaveBeenCalled();
  });
});