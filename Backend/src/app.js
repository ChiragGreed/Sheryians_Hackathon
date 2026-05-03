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
import path from 'path'
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const publicFile = path.join(__dirname, "../", "public/dist")


app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173' || 'https://sheryians-hackathon.onrender.com/',
    credentials: true
}));

app.use(cookieParser());

app.use(express.static(publicFile))

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: Config.GOOGLE_CLIENT_ID,
    clientSecret: Config.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${Config.PORT}/api/auth/google/callback`,
}, (_, __, profile, done) => {
    return done(null, profile);
}));

// Routes
app.use('/api/auth', authRouter);
app.use("/api/chat", chatRouter);
app.use("/api", uploadRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/agent", adminRouter);
app.use("/api/tickets", ticketRouter)


app.use('/', integrationRouter);


export default app;