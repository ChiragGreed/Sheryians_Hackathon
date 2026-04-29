import express from 'express';
import { googleAuth, login, register } from '../controllers/authController.js';
import { loginValidator, registerValidator } from '../validation/authValidation.js';
import passport from 'passport';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, register);

authRouter.post('/login', loginValidator, login);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    googleAuth
)


export default authRouter