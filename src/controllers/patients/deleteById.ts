import { Request, Response } from "express";
import { PatientsProvider } from "../../database/providers/patients";

export const deleteById = async (req: Request, res: Response) => {

    let id = Number(req.params.id)
    if(isNaN(id)) {
        id = 0
    }

    const result = await PatientsProvider.deleteById(id)

    if (result instanceof Error) {
        console.log(`${req.method} ${req.originalUrl} | ${result.message} | ${result.status}`);
        return res.status(result.status).json({
          errors: {
            default: result.message,
          },
        });
      }
     
    return res.send({ message: 'Patient deleted successfully'})
}