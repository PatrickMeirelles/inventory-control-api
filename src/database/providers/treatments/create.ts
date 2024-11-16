import { Knex } from "../../knex";
import { ITreatments } from "../../../models/Treatments";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";

export const create = async (
  treatment: Omit<ITreatments, "id">
): Promise<number | CustomError> => {
  try {

    const alreadyExists = await Knex(ETableNames.treatments)
      .select("id")
      .where('name', treatment.name)
      .first(); 

    if (alreadyExists) {
      throw new CustomError("Treatment already exists", 422);
    }

    const [result] = await Knex(ETableNames.treatments)
      .insert(treatment)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    throw new CustomError("Error to create a new treatment", 500);
  } catch (error) {
    if (error instanceof CustomError) {
      return error;
    }
    return new CustomError("Error to create a new treatment", 500);
  }
};