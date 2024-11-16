import { Request, Response } from "express";
import { ConsultsProvider } from "../../database/providers/consults";

export const getById = async (req: Request, res: Response) => {

    let id = Number(req.params.id)
    if(isNaN(id)) {
        id = 0
    }

    const result = await ConsultsProvider.getById(id)
     
    return res.send(result)
}