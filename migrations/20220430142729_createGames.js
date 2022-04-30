/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("games", function (table) {
    table.increments("id");
    table.integer("player_one_id").unsigned().notNullable();
    table.foreign("player_one_id").references("id").inTable("users");
    table.integer("player_two_id").unsigned().notNullable();
    table.foreign("player_two_id").references("id").inTable("users");
    table.integer("RESULT").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("games");
};
