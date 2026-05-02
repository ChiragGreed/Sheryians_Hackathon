import { Config } from "../config/config.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import slugify from "slugify";
import organizationModel from "../models/organizationModel.js";
import mongoose from "mongoose";

function generateToken(user) {
    return JWT.sign(
        {
            userId: user._id,
            organizationId: user.organizationId,
            role: user.role
        },
        Config.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

async function generateUniqueSlug(baseName, maxAttempts = 10) {
    const baseSlug = slugify(baseName, { lower: true, strict: true });
    let slug = baseSlug;
    for (let i = 0; i < maxAttempts; i++) {
        const existingOrg = await organizationModel.findOne({ slug });
        if (!existingOrg) return slug;
        slug = baseSlug + "-" + (i + 2);
    }
    return null;
}

export const register = async (req, res) => {
    const { username, email, password, organizationName } = req.body;

    if (!username || !email || !password || !organizationName) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        });
    }
    const userExist = await userModel.findOne({ $or: [{ username }, { email }] });

    if (userExist) return res.status(400).json({
        message: "User already exists with this " + (userExist.email === email ? "email" : "username"),
        success: false,
    })

    const slug = await generateUniqueSlug(organizationName);
    if (!slug) {
        return res.status(500).json({ message: "Could not generate a unique organization slug. Please try a different organization name.", success: false });
    }

    const session = await mongoose.startSession();
    let organization, user;
    try {
        await session.withTransaction(async () => {
            [organization] = await organizationModel.create([{ name: organizationName, slug }], { session });
            [user] = await userModel.create([{ username, email, password, role: "Owner", organizationId: organization._id }], { session });
        });
    } catch (err) {
        if (err.code === 11000) {
            const field = err.keyPattern ? Object.keys(err.keyPattern)[0] : "field";
            return res.status(400).json({ message: `A user or organization with this ${field} already exists.`, success: false });
        }
        throw err;
    } finally {
        session.endSession();
    }

    const token = generateToken(user);

    res.status(201).json({
        message: "Organization and owner created",
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId
        },
        organization: {
            id: organization._id,
            name: organization.name,
            slug: organization.slug
        }
    })

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) return res.status(400).json({
        message: "Invalid credentials",
        success: false,
    })

    const VerifyPassword = await bcrypt.compare(password, user.password);

    if (!VerifyPassword) return res.status(400).json({
        message: "Invalid credentials",
        success: false,
    })


    const token = generateToken(user);

    res.status(200).json({
        message: "User Logged in",
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId
        }
    })

}

export const googleAuth = async (req, res) => {
    const { id, displayName, emails } = req.user;
    const email = emails[0].value;

    let user = await userModel.findOne({ email });

    if (!user) {
        const slug = await generateUniqueSlug(displayName);
        if (!slug) {
            return res.status(500).json({ message: "Could not generate a unique organization slug.", success: false });
        }

        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
                const [organization] = await organizationModel.create([{ name: displayName, slug }], { session });
                [user] = await userModel.create([{ username: displayName, email, organizationId: organization._id, googleId: id }], { session });
            });
        } catch (err) {
            if (err.code === 11000) {
                const field = err.keyPattern ? Object.keys(err.keyPattern)[0] : "field";
                return res.status(400).json({ message: `A user or organization with this ${field} already exists.`, success: false });
            }
            return res.status(500).json({ message: "Failed to create user account.", success: false });
        } finally {
            session.endSession();
        }
    }

    const token = generateToken(user);

    res.status(201).json({
        message: "User Authenticated successfully",
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId
        },
    });
}