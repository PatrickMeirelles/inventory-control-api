import { Knex } from "../../knex";
import { IConsults } from "../../../models/Consults";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";
import { getCurrentDateFormatted } from "../../../utils/dates";

export const updateById = async (
  consult: Omit<IConsults, "id">, id: number
): Promise<number | CustomError> => {
  try {

    const [result] = await Knex(ETableNames.consults)
      .where('id', id)
      .update({ ...consult, updated_at: getCurrentDateFormatted() })
      .returning("id");

    if(!result) {
        throw new CustomError("Consult not found", 422);
    }
    
    
    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    throw new CustomError("Error to update a consult", 500);
  } catch (error) {
    if (error instanceof CustomError) {
      return error;
    }
    return new CustomError("Error to update a consult", 500);
  }
};