import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import navItemRoutes from './routes/navItem.route.js';
import skillsRoutes from './routes/skills.route.js';
import reviewsRoutes from './routes/reviews.route.js';
import experiencesRoutes from './routes/experience.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://portfolio-dashboard-5lp4.onrender.com'
    ],
    credentials: true
  })
);
app.use(express.json()); // allows us to parse incoming requests: req.body
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/nav-items', navItemRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/experiences', experiencesRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(5000, async () => {
  await connectDB();
  console.log('Server is running on port:', PORT);
});
