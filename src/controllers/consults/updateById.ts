import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ConsultsProvider } from "../../database/providers/consults";
import { validation } from "../../middlewares/auth";
import { IConsults } from "../../models/Consults";

interface IBodyProps extends Omit<IConsults, "id" | "nome"> { }

export const registerValidation = validation({
    body: yup.object().shape({
        patient_id: yup.number(),  
        treatment_id: yup.number(),
        consult_date: yup.date(),
        final_consult_date: yup.date(),
        contact_date: yup.date(),
        contacted: yup.boolean().default(false)
    }),
});

export const updateById = async (
    req: Request<{ id: string }, {}, IBodyProps>,
    res: Response
) => {
    const { id } = req.params;
    const result = await ConsultsProvider.updateById(req.body, Number(id));
  
    if (result instanceof Error) {
      console.log(`${req.method} ${req.originalUrl} | ${result.message} | ${result.status}`);
      return res.status(result.status).json({
        errors: {
          default: result.message,
        },
      });
    }

    return res.status(StatusCodes.CREATED).json({ message: "Consult updated successfully"})
}