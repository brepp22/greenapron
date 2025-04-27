const express = require('express');
const db = require('../db');

const router = express.Router();

// Get all messages for a given person_id
router.get('/:person_id', async (req, res) => {
  const { person_id } = req.params;

  // Validate person_id
  if (!person_id) {
    return res.status(400).json({ error: 'Person ID is required' });
  }

  try {
    const messages = await db('messages')
      .where({ person_id })
      .orderBy('created_at', 'asc');
    
    if (messages.length === 0) {
      return res.status(404).json({ message: 'No messages found for this person' });
    }

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages', details: err.message });
  }
});

// Post a new message for a given person_id
router.post('/:person_id', async (req, res) => {
  const { person_id } = req.params;
  const { text } = req.body;

  // Validate input data
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }

  if (!person_id) {
    return res.status(400).json({ error: 'Person ID is required' });
  }

  try {
    // Insert new message
    const [id] = await db('messages').insert({ person_id, text });
    
    // Fetch the newly inserted message
    const newMessage = await db('messages').where({ id }).first();
    
    // Return the newly created message
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to post message', details: err.message });
  }
});

module.exports = router;
