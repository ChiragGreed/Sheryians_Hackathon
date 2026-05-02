import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        select: false,
        required: function () {
            return !this.googleId
        },
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    role: {
        type: String,
        default: "Owner",
        enum: ["Owner", "Admin", "Agent"]
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organizations",
        required: false
    }

})


userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const userModel = mongoose.model("users", userSchema);

export default userModel