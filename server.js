const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Category = require('./models/category.model');
const categoryRoutes = require('./routes/categories');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', categoryRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    await sequelize.sync();
    console.log('Database synced.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();