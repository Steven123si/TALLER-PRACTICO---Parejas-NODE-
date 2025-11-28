import "dotenv/config";
console.log("DEBUG JWT_SECRET =>", process.env.JWT_SECRET);


import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";


const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors({ origin: "*" }));

// Necesario para leer JSON
app.use(express.json());

// Inicializar Passport
app.use(passport.initialize());

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

// Rate limit SOLO para login
app.use("/auth/login", authLimiter);

// Rutas de autenticación
app.use("/auth", authRoutes);

// Rutas de tareas (protegidas + limitadas)
app.use(
    "/tasks",
    tasksLimiter,
    passport.authenticate("jwt", { session: false }),
    taskRoutes
);

app.get("/", (req, res) => {
    res.send("API running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
