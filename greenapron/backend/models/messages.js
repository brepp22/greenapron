
const db = require('../db');


function getAllMessages(limit=3) {
  let query = db('messages')
    .join('users', 'messages.person_id', '=', 'users.id') 
    .select('messages.id', 'messages.text', 'messages.created_at', 'users.name', 'users.email') 
    .orderBy('messages.created_at', 'desc');

    if(limit !== 'all'){
      query = query.limit(Number(limit));
    }

    return query;
}


function getMessagesByPersonId(board_owner_id) {
  return db('messages')
    .join('users as authors', 'messages.author_id', '=', 'authors.id')
    .select(
      'messages.id',
      'messages.text',
      'messages.created_at',
      'authors.name as author_name',
      'authors.partner_number as author_pn'
    )
    .where('messages.board_owner_id', board_owner_id)
    .orderBy('messages.created_at', 'desc');
}


function addMessage(message) {
  return db('messages')
    .insert(message)
    .returning('*'); 
}

async function createMessage({ board_owner_id, text, author_id }) {
  const [id] = await db('messages').insert({ board_owner_id, text, author_id });

  return db('messages')
    .join('users as authors', 'messages.author_id', '=', 'authors.id')
    .select(
      'messages.id',
      'messages.text',
      'messages.created_at',
      'authors.name as author_name',
      'authors.partner_number as author_pn'
    )
    .where('messages.id', id)
    .first();
}




module.exports = {
  getAllMessages,
  getMessagesByPersonId,
  addMessage,
  createMessage,
};
