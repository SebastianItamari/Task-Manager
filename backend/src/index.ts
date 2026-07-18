// Import necessary modules
import type { Request, Response } from "express";

const apiKey = 'sk_test_FALSO123456789'  //// TODO: mover a variable de entorno

require("dotenv/config");
const express = require("express");
const cors = require("cors"); // Allow cross-origin requests

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("¡El backend está funcionando!");
});

// Integrate routes
app.use("/tasks", require("./routes/tasks"));
app.use("/auth", require("./routes/auth"));
app.use("/test", require("./routes/test"));

// Start the server
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});