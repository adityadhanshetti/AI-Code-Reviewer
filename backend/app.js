import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { getReview } from './src/controllers/aiCodeReview.controller.js';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/api/review', getReview);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
