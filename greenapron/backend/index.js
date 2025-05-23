const express = require('express');
const cors = require('cors');
const messagesRouter = require('./routes/messageRouter');
const usersRouter = require('./routes/userRouter'); 
const app = express();






app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter)

// app.get('/', (req, res) => {
//   res.send('API is running');
// });



app.get('/', (req, res) => {
  res.send('API is up and running!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



