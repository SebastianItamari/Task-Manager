const router = require("express").Router();
const verifyToken = require("../middleware/auth");

// To apply middleware to all routes
router.use(verifyToken);

// To test if the token validation works
router.get("/private", async (req: any, res: any) => {
  res.json({ message: "¡Acceso autorizado a la ruta privada!" });
});

// Export the module
module.exports = router;