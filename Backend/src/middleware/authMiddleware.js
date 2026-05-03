import JWT from 'jsonwebtoken';
import { Config } from "../config/config.js";

export const verifyToken = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({
        message: "Token not provided",
        success: false,
        error: "No token provided"
    })

    const decodedToken = JWT.verify(token, Config.JWT_SECRET);

    if (!decodedToken) return res.status(401).json({
        message: "User not authorised",
        success: false,
        error: "Invalid token"
    })

    req.user = decodedToken;
    
    next();
}