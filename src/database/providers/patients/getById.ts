import { Knex } from "../../knex";
import { IPatients } from "../../../models/Patients";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";

export const getById = async (id: number): Promise<IPatients[] | CustomError> => {
  try {

    let patients: IPatients[]
    if(id > 0) {
        patients = await Knex(ETableNames.patients).select('*').where('id', id)
    } else {
        patients = await Knex(ETableNames.patients).select('*')
    }

    return patients;

  } catch (error) {
    if (error instanceof CustomError) {
      return error;
    }
    return new CustomError("Error", 500);
  }
};