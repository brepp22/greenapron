const express = require('express');
const cors = require('cors');
const messagesRouter = require('./routes/messages');

const app = express();

// Allow requests from localhost:3000 (your frontend URL)
app.use(cors({
  origin: 'http://localhost:3000', // Allow only frontend (localhost:3000)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/messages', messagesRouter);

app.get('/', (req, res) => {
  res.send('API is up and running!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
