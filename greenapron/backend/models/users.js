const db = require('../db'); 

async function createUser(user) {
  const [id] = await db('users').insert(user);
  // return findById(id);
  return db('users').where({id}).first();
}


function findByPartnerNumber(partner_number) {
  return db('users').where({partner_number}).first();
}

function getAllUsers() {
  return db('users');  
}

function findById(id) {
  return db('users').where({ id }).first();
}

module.exports = {
  createUser,
  findByPartnerNumber,
  getAllUsers,
  findById 
};
