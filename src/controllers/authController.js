import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client.js";

// REGISTER
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Email y password requeridos" });

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser)
            return res.status(400).json({ message: "El usuario ya existe" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        const { password: _, ...safeUser } = user;

        res.status(201).json({
            message: "Usuario creado",
            user: safeUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error registrando usuario" });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email y password requeridos" });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login exitoso",
            token
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error iniciando sesión" });
    }
};
