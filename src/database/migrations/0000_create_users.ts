import { Knex } from "knex";
import { ETableNames } from "../TableNames";

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.users, (table) => {
            table.bigIncrements("id").primary().index();
            table.string("name", 100).notNullable();
            table.string("email", 100).index().notNullable();
            table.string("password", 20).notNullable();
            table.datetime("created_at").notNullable().defaultTo(knex.fn.now());
            table.datetime("updated_at").notNullable().defaultTo(knex.fn.now());
        })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.users).then(() => {
      console.log(`Dropped table - ${ETableNames.users}`);
    });
  }