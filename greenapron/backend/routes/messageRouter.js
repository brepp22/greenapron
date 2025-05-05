const express = require('express');
const router = express.Router();
const Message = require('../models/messages');


router.get('/', async (req, res) => {
  try {
    const messages = await Message.getAllMessages();
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
  const { person_id, text } = req.body;

  if (!person_id || !text) {
    return res.status(400).json({ message: 'Missing required fields: person_id and text' });
  }

  try {
    const newMessage = await Message.createMessage({ person_id, text });
    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Error inserting message:', err);
    res.status(500).json({ message: 'Failed to add message', error: err.message });
  }
});

module.exports = router;
