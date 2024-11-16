import { Request, Response } from "express";
import { PatientsProvider } from "../../database/providers/patients";

export const getById = async (req: Request, res: Response) => {

    let id = Number(req.params.id)
    if(isNaN(id)) {
        id = 0
    }

    const result = await PatientsProvider.getById(id)
     
    return res.send(result)
}