import { Knex } from "../../knex";
import { IPatients } from "../../../models/Patients";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";
import { getCurrentDateFormatted } from "../../../utils/dates";
import { isValidDocument } from "../../../utils/validateDocument";

export const updateById = async (
  patient: Omit<IPatients, "id">, id: number
): Promise<number | CustomError> => {
  try {

    let document = patient.document.replace(/[^\d]+/g, '');
    
    if(document.length < 12) {
        const validateDocument = isValidDocument(patient.document)
        if(!validateDocument) {
            throw new CustomError("Document is invalid", 422)
        }
        document = patient.document
    }


    const [result] = await Knex(ETableNames.patients)
      .where('id', id)
      .update({ ...patient, updated_at: getCurrentDateFormatted() })
      .returning("id");

    if(!result) {
        throw new CustomError("Patient not found", 422);
    }
    
    
    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    throw new CustomError("Error to update a patient", 500);
  } catch (error) {
    if (error instanceof CustomError) {
      return error;
    }
    return new CustomError("Error to update a patient", 500);
  }
};