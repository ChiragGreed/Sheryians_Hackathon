import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import chatRouter from "./routes/chatRouter.js";
import uploadRoutes from "./routes/uploadRouter.js";
import aiRoutes from "./routes/aiRoutes.js";
import adminRouter from "./routes/adminRouter.js";
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { Config } from './config/config.js';
import cors from 'cors';
import ticketRouter from './routes/ticketRouter.js';
import integrationRouter from './routes/integrationRouter.js';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const publicFile = path.join(__dirname, "../", "public/dist");

app.use(express.json());

// FIX: '||' always picked localhost because a non-empty string is truthy
// Now properly allows both local dev and production frontend
const allowedOrigins = [
    'http://localhost:5173',
    'https://sheryians-hackathon.onrender.com',
];

app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin (Postman, mobile apps, curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true  // required for cookies to be sent cross-origin
}));

app.use(cookieParser());

app.use(express.static(publicFile));

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: Config.GOOGLE_CLIENT_ID,
    clientSecret: Config.GOOGLE_CLIENT_SECRET,
    callbackURL: `https://sheryians-hackathon.onrender.com/api/auth/google/callback`, // FIX: was pointing to localhost
}, (_, __, profile, done) => {
    return done(null, profile);
}));

// Routes
app.use('/api/auth', authRouter);
app.use("/api/chat", chatRouter);
app.use("/api", uploadRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/agent", adminRouter);
app.use("/api/tickets", ticketRouter);
app.use('/', integrationRouter);

export default app;