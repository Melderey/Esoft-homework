/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { id: 1, login: "login_player_1", name: "name_AAA" },
    { id: 2, login: "login_player_2", name: "name_BBB" },
    { id: 3, login: "login_player_3", name: "name_CCC" },
    { id: 4, login: "login_player_4", name: "name_DDD" },
    { id: 5, login: "login_player_5", name: "name_FFF" },
  ]);
};
