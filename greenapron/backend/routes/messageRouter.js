const express = require('express');
const router = express.Router();
const Message = require('../models/messages');


router.get('/', async (req, res) => {
  const limit= req.query.limit || 3;
  try {
    const messages = await Message.getAllMessages(limit);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const messages = await Message.getMessagesByPersonId(id);
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: 'No messages found for this user' });
    }
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.post('/', async (req, res) => {
  const { board_owner_id, text, author_id } = req.body;

  if (!board_owner_id || !text || !author_id) {
    return res.status(400).json({ message: 'Missing required fields: board_owner_id text and name' });
  }

  try {
    const newMessage = await Message.createMessage({ board_owner_id, text, author_id });
    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Error inserting message:', err);
    res.status(500).json({ message: 'Failed to add message', error: err.message });
  }
});

module.exports = router;
