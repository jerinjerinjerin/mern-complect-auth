import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/connectDB.js';
import authRoute from './route/auth.route.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true}));


app.use(express.json());// allow us to parse incoming rquests:req.body
app.use(cookieParser());//allow us to parse incoming cookies

app.use('/api/auth', authRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})