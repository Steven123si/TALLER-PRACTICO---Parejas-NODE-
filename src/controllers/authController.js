import bcrypt from "bcryptjs";
import { prisma } from "../prisma/client.js";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Email y password requeridos" });

        // Revisar si el email ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser)
            return res.status(400).json({ message: "El usuario ya existe" });

        // Hash a la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: "Usuario creado", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error registrando usuario" });
    }
};
