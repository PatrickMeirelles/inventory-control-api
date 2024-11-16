import { Request, Response } from "express";
import { TreatmentProvider } from "../../database/providers/treatments";
export const getById = async (req: Request, res: Response) => {

    let id = Number(req.params.id)
    if(isNaN(id)) {
        id = 0
    }

    const result = await TreatmentProvider.getById(id)
     
    return res.send(result)
}