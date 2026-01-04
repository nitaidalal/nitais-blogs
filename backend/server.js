import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db.js';
import adminRouter from './routes/admin.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import newsletterRouter from './routes/newsletter.routes.js';

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://nitais-blogs.vercel.app/",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Welcome to Nitai's Blogs");
});

app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use("/api/auth", authRouter);
app.use('/api/newsletter', newsletterRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  
});
