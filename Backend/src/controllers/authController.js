import { config } from "dotenv";
import { Config } from "../config/config.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import slugify from "slugify";
import organizationModel from "../models/organizationModel.js";

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
        message: "User already exist from this " + (userExist.email == email ? "email" : "username"),
        success: false,
    })

    let slug = slugify(organizationName, {
        lower: true,
        strict: true
    });

    const existingOrg = await organizationModel.findOne({ slug });
    if (existingOrg) {
        slug = slug + "-" + Math.floor(Math.random() * 1000);
    }
    const organization = await organizationModel.create({ name: organizationName, slug });
    const user = await userModel.create({ username, email, password, role: "Owner", organizationId: organization._id });

    const token = generateToken(user);

    res.status(201).json({
        message: "Organization and owner created",
        token,
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

        let slug = slugify(displayName, { lower: true, strict: true });

        const existingOrg = await organizationModel.findOne({ slug });
        if (existingOrg) {
            slug += "-" + Math.floor(Math.random() * 1000);
        }

        const organization = await organizationModel.create({
            name: displayName,
            slug
        });

        user = await userModel.create({ username: displayName, email, organizationId: organization._id, googleId: id });
    }

    const token = generateToken(user);

    res.status(201).json({
        message: "User Authenticated successfully",
        success: true,
        user,
    })

    res.redirect('http://localhost:5173/');
}