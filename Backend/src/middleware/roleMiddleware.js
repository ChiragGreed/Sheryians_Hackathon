import JWT from 'jsonwebtoken';
import { Config } from "../config/config.js";

export const isAdmin = (req, res, next) => {
    try {
        // req.user comes from verifyToken
        if (!req.user) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized: No user in request"
        });
        }

        const { role } = req.user;

        if (!role) {
        return res.status(400).json({
            success: false,
            error: "Role not found in token"
        });
        }

        // normalize role (handles "Owner", "admin", etc.)
        const normalizedRole = role.toLowerCase();

        if (normalizedRole !== "admin" && normalizedRole !== "owner") {
        return res.status(403).json({
            success: false,
            error: "Access denied: Admins only"
        });
        }

        next();
    } catch (err) {
        return res.status(500).json({
        success: false,
        error: "Role middleware error"
        });
    }
};


export const isAgent = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const role = req.user.role?.toLowerCase();

    if (role !== "agent") {
      return res.status(403).json({ error: "Agents only" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: "Role middleware error" });
  }
};