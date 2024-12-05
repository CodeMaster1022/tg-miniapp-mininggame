const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://new-game-psi.vercel.app/', 'https://t.me'] // Add your production domains
    : ['http://localhost:3000', 'http://localhost:5173', 'https://t.me'], // Development domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/games', require('./routes/gameRoutes'));

// Test routes (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use('/test', require('./test'));
}

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


export default app;