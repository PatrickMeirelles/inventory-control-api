import { ETableNames } from "../../TableNames";
import { IUsers } from "../../../models/Users";
import { Knex } from "../../knex";

export const getByEmail = async (email: string): Promise<IUsers | Error> => {
  try {
    const result = await Knex(ETableNames.users)
      .select("*")
      .where("email", "=", email)
      .first();

    if (result) return result;

    return new Error("Users not found");
  } catch (error) {
    console.log(error);
    return new Error("Error to get user");
  }
};