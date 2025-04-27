/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// seeds/20230427000000_users_seed.js

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password456' },
      ]);
    });
};
