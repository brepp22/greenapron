const express = require('express');
const messagesRouter = require('./routes/messages');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use('/api/messages', messagesRouter);

// Default route
app.get('/', (req, res) => {
  res.send('API is up and running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
