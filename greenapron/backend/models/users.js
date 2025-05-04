const db = require('../db'); 

async function createUser(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function findById(id) {
  return db('users').where({ id }).first();
}

/
function getAllUsers() {
  return db('users');  
}

module.exports = {
  createUser,
  findById,
  getAllUsers  
};
