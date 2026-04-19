const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

require("dotenv/config");

// To create a new user
router.post("/register", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { 
        email: email,
        password: hashed },
    });

    res.json(newUser);
  } catch (error) {
    console.error("Error en POST /auth/register:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

// To login a user (get token)
router.post("/login", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.json({ token });
  } catch (error) {
    console.error("Error en POST /auth/login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
})

// Export the module
module.exports = router;
