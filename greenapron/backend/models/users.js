const db = require('../db'); // adjust the path as needed

async function createUser(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function findById(id) {
  return db('users').where({ id }).first();
}

module.exports = {
  createUser,
  findById,
};
