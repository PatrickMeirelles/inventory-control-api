import { Knex } from "../../knex";
import { ETableNames } from "../../TableNames";
import CustomError from "../../../utils/ErrorsMessage";

export const deleteById = async (id: number): Promise<number | CustomError> => {
    try {

        const patientDeleted: number = await Knex(ETableNames.patients).where('id', id).delete().returning('id')

        if (patientDeleted > 0) {
            return 1;
        }
        
        throw new CustomError("Patient not found or delete failed", 422);

    } catch (error) {
        if (error instanceof CustomError) {
            return error;
        }
        return new CustomError("Error", 500);
    }
};