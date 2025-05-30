/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// 20250530215319_add_author_to_messages.js
exports.up = async function(knex) {
  // First: add the new column
  await knex.schema.alterTable('messages', (table) => {
    table.integer('author_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
  });

  // Second: rename the column separately
  await knex.schema.alterTable('messages', (table) => {
    table.renameColumn('person_id', 'board_owner_id');
  });
};

exports.down = async function(knex) {
  // First: rename the column back
  await knex.schema.alterTable('messages', (table) => {
    table.renameColumn('board_owner_id', 'person_id');
  });

  // Second: drop the column
  await knex.schema.alterTable('messages', (table) => {
    table.dropColumn('author_id');
  });
};
