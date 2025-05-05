
const db = require('../db');


function getAllMessages() {
  return db('messages')
    .join('users', 'messages.person_id', '=', 'users.id') 
    .select('messages.id', 'messages.text', 'messages.created_at', 'users.name', 'users.email') // Select fields from both tables
    .orderBy('messages.created_at', 'desc');
}


function getMessagesByPersonId(person_id) {
  return db('messages')
    .join('users', 'messages.person_id', '=', 'users.id')
    .select('messages.id', 'messages.text', 'messages.created_at', 'users.name', 'users.email') // Select fields from both tables
    .where('messages.person_id', person_id)
    .orderBy('messages.created_at', 'desc');
}


function addMessage(message) {
  return db('messages')
    .insert(message)
    .returning('*'); 
}

async function createMessage({ person_id, text }) {
  const [id] = await db('messages').insert({ person_id, text });
  
  return db('messages')
    .join('users', 'messages.person_id', '=', 'users.id')
    .select('messages.id', 'messages.text', 'messages.created_at', 'users.name', 'users.email')
    .where('messages.id', id)
    .first();
}


module.exports = {
  getAllMessages,
  getMessagesByPersonId,
  addMessage,
  createMessage,
};
