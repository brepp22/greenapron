const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/:person_id', async (req, res) => {
  const { person_id } = req.params;
  try {
    const messages = await db('messages')
      .where({ person_id })
      .orderBy('created_at', 'asc');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});


router.post('/:person_id', async (req, res) => {
  const { person_id } = req.params;
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const [id] = await db('messages').insert({ person_id, text });
    const newMessage = await db('messages').where({ id }).first();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post message' });
  }
});

module.exports = router;
