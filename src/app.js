const express = require('express');
const spamRoutes = require('./routes/spamRoutes');
const searchRoutes = require('./routes/searchRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Spam Detection API is running...');
});
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/spam', spamRoutes);
app.use('/api/search', searchRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
