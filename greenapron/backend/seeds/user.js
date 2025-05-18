/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// seeds/20230427000000_users_seed.js

const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  await knex('users').del();

  const users = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await bcrypt.hash('starbucks123', 8)
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: await bcrypt.hash('password456', 8)
    }
  ];

  return knex('users').insert(users);
};

