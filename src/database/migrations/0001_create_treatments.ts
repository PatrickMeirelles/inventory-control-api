import { Knex } from "knex";
import { ETableNames } from "../TableNames";

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.treatments, (table) => {
            table.bigIncrements("id").primary().index();
            table.string("name", 100).notNullable().unique();
            table.datetime("created_at").notNullable().defaultTo(knex.fn.now());
            table.datetime("updated_at").notNullable().defaultTo(knex.fn.now());
        })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.treatments).then(() => {
      console.log(`Dropped table - ${ETableNames.treatments}`);
    });
  }