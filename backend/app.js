import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/userRoutes.js';
import mongoose from'mongoose';
import authRouter from './routes/authRoutes.js';
 

dotenv.config();


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
    }
));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


//database connection
mongoose.connect('mongodb+srv://nmnnrb:nmnnrb@usermanagement.idozn.mongodb.net/Users?retryWrites=true&w=majority&appName=UserManagement').then(() => {
    console.log('Database connected...');
})





//ports and database
const port = process.env.PORT || 8000;



//route
app.use('/api' , authRouter)
app.use('/user' , userRouter);



app.listen(port , () => {{
    console.log(`Server is running on port ${port}`);
}});