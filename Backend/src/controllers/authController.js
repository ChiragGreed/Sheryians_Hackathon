import { config } from "dotenv";
import { Config } from "../config/config.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

function tokenGeneration(user, res) {

    const token = JWT.sign({
        userId: user._id,
        fullname: user.fullname,
    }, Config.JWT_SECRET,
        { expiresIn: '7d' });

    res.cookie("token", token);

}

export const register = async (req, res) => {
    const { fullname, email, password, role } = req.body;

    const userExist = await userModel.findOne({ $or: [{ fullname }, { email }] });

    if (userExist) return res.status(400).json({
        message: "User already exist from this " + (userExist.email == email ? "email" : "username"),
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
        message: "User registered",
        success: true,
        user
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

    res.status(201).json({
        message: "User Logged in",
        success: true,
        user,
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
        user,
    })

    res.redirect('http://localhost:5173/');
}