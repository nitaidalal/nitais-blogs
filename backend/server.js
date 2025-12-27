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



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use("/api/auth", authRouter);
app.use('/api/newsletter', newsletterRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  
});
