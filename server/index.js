require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const salaryRoutes = require('./routes/salaryRoutes');
const trendingRoutes = require('./routes/trendingRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Security and utility middlewares
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (
      origin.includes('vercel.app') ||
      origin.includes('localhost')
    ) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))
app.use(express.json({ limit: '10kb' }));

// Mount routes
app.use('/api/salary', salaryRoutes);
app.use('/api/trending', trendingRoutes);
app.use('/api/auth', authRoutes);

// Root welcome endpoint
app.get('/', (req, res) => {
  res.send('Salary Coach API is running...');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Global Error handler (must be last)
app.use(errorHandler);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
});
