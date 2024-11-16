import { Knex } from "knex";
import { ETableNames } from "../TableNames";

export async function seed(knex: Knex): Promise<void> {

  const treatment = ["Soro", "Semaglutida", "Hormonais"]

  const findNames = await knex(ETableNames.treatments).select('name').whereIn('name', treatment)

  if(findNames.length > 0) {
    return
  }

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