/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// migrations/20230427000000_create_users_table.js

exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();  
      table.string('name').notNullable();  
      table.string('partner_number').notNullable().unique();  
      table.string('password').notNullable(); 
      table.string('role').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());  
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  
