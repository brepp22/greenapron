const express = require('express');
const router = express.Router();
const Users = require('../models/users'); 

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret-dev-key'; //move to .env before production 

const restricted = require('../../src/middleware/restricted');

const db = require('../db')


function generateToken(user){
  return jwt.sign(
    {id: user.id , email: user.email},
    JWT_SECRET, 
    {expiresIn: '1d'}
  );
}


/* ────────────────────────── routes ─────────────────────────── */

/**  GET /api/users  – list all users (sanitised) */
router.get('/', async (req, res) => {
  try {
    const users = await Users.getAllUsers();
    const safe  = users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role }));
    res.json(safe);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**  POST /api/users/register  – create account */
router.post('/register', async (req, res) => {
  const { name, partner_number, password, role } = req.body;
  if (!name || !partner_number || !password || !role)
    return res.status(400).json({ message: 'Missing required fields' });

  try {
    const hash     = bcrypt.hashSync(password, 10);
    const newUser  = await Users.createUser({ name, partner_number, password: hash, role });
    const token    = generateToken(newUser);

    res.status(201).json({ id: newUser.id, name, partner_number, role, token });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      res.status(409).json({ message: 'Partner Number already exists' });
    } else {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
});

/**  POST /api/users/login  – authenticate */
router.post('/login', async (req, res) => {
  const { partner_number, password } = req.body;
  if (!partner_number || !password)
    return res.status(400).json({ message: 'Partner Number and Password Required' });

  try {
    const user = await Users.findByPartnerNumber(partner_number);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.json({ message: `Welcome back, ${user.name}!`, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// router.get('/profile', restricted, async (req, res) => {
//   try {
//     const user = await Users.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const safeUser = { id: user.id, name: user.name, partner_number: user.partner_number };
//     res.json(safeUser);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });


router.get('/profile', restricted, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Users.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fetch all comments/messages received
    const comments = await db('messages')
      .where('board_owner_id', userId)
      .join('users as authors', 'messages.author_id', 'authors.id')
      .select(
        'messages.id',
        'messages.text',
        'messages.created_at',
        'authors.name as from_user'
      )
      .orderBy('messages.created_at', 'desc');

    const safeUser = {
      id: user.id,
      name: user.name,
      partner_number: user.partner_number,
      comments_received: comments
    };

    res.json(safeUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;


