import { Knex } from "knex";
import { ETableNames } from "../TableNames";

export async function seed(knex: Knex): Promise<void> {
  await knex(ETableNames.treatments).insert([
    {
      name: "Soro",
    },
    {
      name: "Semaglutida",
    },
    {
      name: "Hormonais",
    }
    ]);
}