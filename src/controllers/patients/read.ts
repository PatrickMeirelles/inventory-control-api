import { Response } from "express";
import { PatientsProvider } from "../../database/providers/patients";

export const read = async ({}, res: Response) => {
    const result = await PatientsProvider.read();

    return res.send(result)
}