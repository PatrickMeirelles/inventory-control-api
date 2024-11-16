import { Knex } from "../../knex";
import { IPatients } from "../../../models/Patients";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";

export const read = async (): Promise<IPatients[] | CustomError> => {
  try {

    const result: IPatients[] = await Knex(ETableNames.patients)
      .select("*")

      return result;

  } catch (error) {
    if (error instanceof CustomError) {
      return error;
    }
    return new CustomError("Error", 500);
  }
};