import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autorizado: token faltante" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // adjuntar el id del usuario al request
    req.user = { id: decoded.userId };

    next(); // continuar a la ruta
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
