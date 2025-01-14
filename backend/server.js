import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';


import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://odc-one.vercel.app', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json())

app.use('/auth',authRoutes);
app.use('/movies', movieRoutes);
app.use('/profile', profileRoutes);

const startServer = async () => {
  try {
    await connectDB(); 
    app.get('/', (req, res) => {
      res.send("Welcome to backend");
    });

    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1); // Exit the process if server initialization fails
  }
};

startServer();
