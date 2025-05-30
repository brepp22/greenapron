const express = require('express');
const cors = require('cors');
const messagesRouter = require('./routes/messageRouter');
const usersRouter = require('./routes/userRouter'); 
const app = express();
const authenticate = require('./middleware/authenticate');
const db = require('./db')






app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter)



app.get('/', (req, res) => {
  res.send('API is up and running!');
});

app.get('/api/profile', authenticate, async (req, res) => {
  try {
    const user = await db('users').where({ id: req.user.id }).first();
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ id: user.id, name: user.name }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



