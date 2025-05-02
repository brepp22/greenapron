const db = require('../db'); // adjust the path as needed

async function createUser(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function findById(id) {
  return db('users').where({ id }).first();
}

// Add this function to retrieve all users
function getAllUsers() {
  return db('users');  // This will return all users from the 'users' table
}

module.exports = {
  createUser,
  findById,
  getAllUsers  // Export the new function
};
