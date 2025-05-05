const express = require('express');
const router = express.Router();
const Message = require('../models/messages'); 

router.get('/', async (req, res) => {
    try {
      const users = await Message.getAllMessages(); 
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  

router.post('/', async (req, res) => {
  try {
    const { text , person_id } = req.body;

    if (!text || !person_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newMessage = await Message.createMessage({ text, person_id });
    console.log(`${text}`)
    res.status(201).json(newMessage);
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

module.exports = router;
