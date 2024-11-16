import { Knex } from "../../knex";
import { ITreatments } from "../../../models/Treatments";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";

export const getById = async (id: number): Promise<ITreatments[] | CustomError> => {
  try {

    let treatments: ITreatments[]
    if(id > 0) {
        treatments = await Knex(ETableNames.treatments).select('*').where('id', id)
    } else {
        treatments = await Knex(ETableNames.treatments).select('*')
    }

    return treatments;

  } catch (error) {
    if (error instanceof CustomError) {
      return error;
    }
    return new CustomError("Error", 500);
  }
};