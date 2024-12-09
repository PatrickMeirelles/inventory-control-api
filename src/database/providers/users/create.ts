import { Crypto } from "../../../utils";
import { Knex } from "../../knex";
import { IUsers } from "../../../models/Users";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";

export const create = async (
  user: Omit<IUsers, "id">
): Promise<number | CustomError> => {
  try {
    const hashedPassword = await Crypto.hashPassword(user.password);
    const alreadyUse = await Knex(ETableNames.users)
      .select("id")
      .where('email', user.email)
      .first(); 

    if (alreadyUse) {
      throw new CustomError("Email already in use", 422);
    }

    const [result] = await Knex(ETableNames.users)
      .insert({ ...user, password: hashedPassword })
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    throw new CustomError("Error to create a new user", 500);
  } catch (error) {
    console.log(error);
    
    if (error instanceof CustomError) {
      return error;
    }
    return new CustomError("Error to create a new user", 500);
  }
};