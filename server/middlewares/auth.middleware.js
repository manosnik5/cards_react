import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
    console.log("No token provided.")
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) {
    return res.status(403).json({ message: "Invalid or expired token." });

  }


  req.user = decoded;
  next();
  });
};

export const verifyAdmin = (req, res, next) => {
  if (!req.user){
    return res.status(401).json({message: "Unauthorized!"})
  }
  if (req.user.role !== "Admin"){
    return res.status(403).json({message: "Access denied. Admins only."})
  }

  next();
}

