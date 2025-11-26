import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors({
    origin: "*",
}));

app.use(express.json());

// Rate limit SOLO para login
const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: { message: "Demasiados intentos, intenta en un minuto." }
});

// Rate limit para tasks
const tasksLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
    message: { message: "Demasiadas solicitudes a /tasks." }
});

// APLICAR limitador SOLO a la ruta específica
app.use("/auth/login", authLimiter);

// Aplicar limitador a tasks
app.use("/tasks", tasksLimiter, taskRoutes);

// Rutas normales
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
