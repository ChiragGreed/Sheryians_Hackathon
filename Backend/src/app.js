import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import chatRouter from "./routes/chatRouter.js";
import uploadRoutes from "./routes/uploadRouter.js";
import aiRoutes from "./routes/aiRoutes.js";
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { Config } from './config/config.js';
import cors from 'cors';


const app = express();
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: Config.GOOGLE_CLIENT_ID,
    clientSecret: Config.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${Config.PORT}/api/auth/google/callback`,
}, (_, __, profile, done) => {
    return done(null, profile);
}))


app.use('/api/auth', authRouter);
app.use("/api/chat", chatRouter);
app.use("/api", uploadRoutes);
app.use("/api", aiRoutes);


export default app;