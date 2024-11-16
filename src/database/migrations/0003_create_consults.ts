import { Knex } from "knex";
import { ETableNames } from "../TableNames";

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.consults, (table) => {
            table.bigIncrements("id").primary().index();
            table.integer("patient_id").notNullable().unsigned().references("id").inTable("patients");
            table.integer("treatment_id").notNullable().unsigned().references("id").inTable("treatments");
            table.date("consult_date").notNullable();
            table.date("final_consult_date").notNullable();
            table.date("contact_date");
            table.boolean("contacted").defaultTo(false);
            table.datetime("created_at").notNullable().defaultTo(knex.fn.now());
            table.datetime("updated_at").notNullable().defaultTo(knex.fn.now());
        })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.consults).then(() => {
      console.log(`Dropped table - ${ETableNames.consults}`);
    });
  }