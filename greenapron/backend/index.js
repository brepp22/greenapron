const express = require('express');
const messagesRouter = require('./routes/messages');
const cors = require('cors');

const app = express();


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));


app.use(express.json());

app.use('/api/messages', messagesRouter);

app.get('/', (req, res) => {
  res.send('API is up and running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
