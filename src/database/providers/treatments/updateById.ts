import { Knex } from "../../knex";
import { ITreatments } from "../../../models/Treatments";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";
import { getCurrentDateFormatted } from "../../../utils/dates";

export const updateById = async (
  treatment: Omit<ITreatments, "id">, id: number
): Promise<number | CustomError> => {
  try {

    const [result] = await Knex(ETableNames.treatments)
      .where('id', id)
      .update({ ...treatment, updated_at: getCurrentDateFormatted() })
      .returning("id");

    if(!result) {
        throw new CustomError("Treatment not found", 422);
    }
    
    
    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    throw new CustomError("Error to update a treatment", 500);
  } catch (error) {
    if (error instanceof CustomError) {
      return error;
    }
    return new CustomError("Error to update a treatment", 500);
  }
};