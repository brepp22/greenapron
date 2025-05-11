const express = require('express');
const router = express.Router();
const Users = require('../models/users'); 

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret-dev-key'; //move to .env before production 

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
    const safe  = users.map(u => ({ id: u.id, name: u.name, email: u.email }));
    res.json(safe);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**  POST /api/users/register  – create account */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Missing required fields' });

  try {
    const hash     = bcrypt.hashSync(password, 10);
    const newUser  = await Users.createUser({ name, email, password: hash });
    const token    = generateToken(newUser);

    res.status(201).json({ id: newUser.id, name, email, token });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      res.status(409).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
});

/**  POST /api/users/login  – authenticate */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  try {
    const user = await Users.findByEmail(email);
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

module.exports = router;


// router.get('/', async (req, res) => {
//     try {
//       const users = await Users.getAllUsers(); 
//       res.json(users);
//     } catch (err) {
//       res.status(500).json({ message: 'Server error', error: err.message });
//     }
//   });
  

// router.post('/', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const newUser = await Users.createUser({ name, email, password });
//     res.status(201).json(newUser);
//   } catch (err) {
//     if (err.code === 'SQLITE_CONSTRAINT') {
//       res.status(409).json({ message: 'Email already exists' });
//     } else {
//       res.status(500).json({ message: 'Server error', error: err.message });
//     }
//   }
// });

// module.exports = router;
