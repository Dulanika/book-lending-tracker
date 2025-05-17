const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
try {
const authRoutes = require('./routes/AuthRoutes');
app.use('/api/auth', authRoutes);
console.log('Auth routes loaded');
} catch (error) {
  console.error('Error loading auth routes:', error);
}

const bookRoutes = require('./routes/BookRoutes');
app.use('/api/books', bookRoutes);

const lendRoutes = require('./routes/LendRoutes');
app.use('/api/lend', lendRoutes);

const dashboardRoutes = require('./routes/DashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);



// Routes placeholder
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running!' });
});

module.exports = app;
