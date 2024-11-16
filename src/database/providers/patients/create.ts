import { Knex } from "../../knex";
import { IPatients } from "../../../models/Patients";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";

export const create = async (
  patient: Omit<IPatients, "id">
): Promise<number | CustomError> => {
  try {

    const alreadyExists = await Knex(ETableNames.patients)
      .select("id")
      .where('document', patient.document)
      .first(); 

    if (alreadyExists) {
      throw new CustomError("Document already exists", 422);
    }

    const [result] = await Knex(ETableNames.patients)
      .insert(patient)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    throw new CustomError("Error to create a new patient", 500);
  } catch (error) {
    if (error instanceof CustomError) {
      return error;
    }
    return new CustomError("Error to create a new patient", 500);
  }
};