const db = require('../db'); 

async function createUser(user) {
  const [id] = await db('users').insert(user);
  // return findById(id);
  return db('users').where({id}).first();
}


function findByEmail(email) {
  return db('users').where({email}).first();
}

function getAllUsers() {
  return db('users');  
}

function findById(id) {
  return db('users').where({ id }).first();
}

module.exports = {
  createUser,
  findByEmail,
  getAllUsers,
  findById 
};
