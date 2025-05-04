
const db = require('../db');

function getAllMessages() {
  return db('messages').orderBy('created_at', 'desc');
}

function getMessagesByPersonId(person_id) {
  return db('messages')
    .where({ person_id })
    .orderBy('created_at', 'desc');
}

function addMessage(message) {
  return db('messages')
    .insert(message)
    .returning('*'); 
}

module.exports = {
  getAllMessages,
  getMessagesByPersonId,
  addMessage,
};
