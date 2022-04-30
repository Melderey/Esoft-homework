/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("turns", function (table) {
    table.primary(["game_id", "order"]);
    table.integer("game_id").unsigned().notNullable();
    table.foreign("game_id ").references("id").inTable("games1");
    table.integer("order").unsigned().notNullable();
    table.string("POSITION", 255).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("turns");
};
