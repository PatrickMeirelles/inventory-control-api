import { Request, Response } from "express";
import { TreatmentProvider } from "../../database/providers/treatments";

export const deleteById = async (req: Request, res: Response) => {

    let id = Number(req.params.id)
    if(isNaN(id)) {
        id = 0
    }

    const result = await TreatmentProvider.deleteById(id)

    if (result instanceof Error) {
        console.log(`${req.method} ${req.originalUrl} | ${result.message} | ${result.status}`);
        return res.status(result.status).json({
          errors: {
            default: result.message,
          },
        });
      }
     
    return res.send({ message: 'Treatment deleted successfully'})
}