
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

function createMessage(person_id, text) {
  const newMessage = {person_id , text};
  return db('messages')
    .insert(newMessage)
    .then(() => getMessagesByPersonId(person_id).first())
}

module.exports = {
  getAllMessages,
  getMessagesByPersonId,
  addMessage,
  createMessage,
};
