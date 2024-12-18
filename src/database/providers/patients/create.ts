import { Knex } from "../../knex";
import { IPatients } from "../../../models/Patients";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";
import { isValidDocument } from "../../../utils/validateDocument";

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

    let document = patient.document.replace(/[^\d]+/g, '');
    
    if(document.length < 12) {
        const validateDocument = isValidDocument(patient.document)
        if(!validateDocument) {
            throw new CustomError("Document is invalid", 422)
        }
        document = patient.document
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