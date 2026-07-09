import type { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

require("dotenv/config");

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = verifyToken;