import { Knex } from "../../knex";
import { IConsults } from "../../../models/Consults";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";

export const create = async (
  consult: Omit<IConsults, "id">
): Promise<number | CustomError> => {
  try {

    const [result] = await Knex(ETableNames.consults)
      .insert(consult)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    throw new CustomError("Error to create a new consult", 500);
  } catch (error) {
    if (error instanceof CustomError) {
      return error;
    }
    return new CustomError("Error to create a new consult", 500);
  }
};