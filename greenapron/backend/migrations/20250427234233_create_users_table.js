/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// migrations/20230427000000_create_users_table.js

exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();  // Automatically generates an 'id' as the primary key
      table.string('name').notNullable();  // User's name
      table.string('email').notNullable().unique();  // User's email (should be unique)
      table.string('password').notNullable();  // User's password (hashed or plaintext)
      table.timestamp('created_at').defaultTo(knex.fn.now());  // Created timestamp
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  
