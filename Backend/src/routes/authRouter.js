import express from 'express';
import { googleAuth, login, register } from '../controllers/authController.js';
import { loginValidator, registerValidator } from '../validation/authValidation.js';
import passport from 'passport';
import rateLimit from 'express-rate-limit';

const authRouter = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later.", success: false }
});

authRouter.post('/register', authLimiter, registerValidator, register);

authRouter.post('/login', authLimiter, loginValidator, login);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    googleAuth
)


export default authRouter