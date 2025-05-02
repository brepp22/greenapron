const express = require('express');
const router = express.Router();
const Users = require('../models/users'); // adjust the path as needed

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newUser = await Users.createUser({ name, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      res.status(409).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
});

module.exports = router;
