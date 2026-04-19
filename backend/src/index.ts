// Import necessary modules
const express = require("express");
const cors = require("cors"); // Allow cross-origin requests

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req: any, res: any) => {
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