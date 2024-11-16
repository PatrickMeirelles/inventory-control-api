import { Knex } from "../../knex";
import { IConsults } from "../../../models/Consults";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";

export const getById = async (id: number): Promise<IConsults[] | CustomError> => {
  try {

    let consults: IConsults[]
    if(id > 0) {
        consults = await Knex(ETableNames.consults).select('*').where('id', id)
    } else {
        consults = await Knex(ETableNames.consults).select('*')
    }

    return consults;

  } catch (error) {
    if (error instanceof CustomError) {
      return error;
    }
    return new CustomError("Error", 500);
  }
};