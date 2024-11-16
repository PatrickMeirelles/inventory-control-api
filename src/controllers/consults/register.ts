import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ConsultsProvider } from "../../database/providers/consults";
import { validation } from "../../middlewares/auth";
import { IConsults } from "../../models/Consults";

interface IBodyProps extends Omit<IConsults, "id" | "nome"> { }

export const registerValidation = validation({
    body: yup.object().shape({
        patient_id: yup.number().required(),  
        treatment_id: yup.number().required(),
        consult_date: yup.date().required(),
        final_consult_date: yup.date().required(),
        contact_date: yup.date(),
        contacted: yup.boolean().default(false)
    }),
});

export const register = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    const result = await ConsultsProvider.create(req.body);
  
    if (result instanceof Error) {
      console.log(`${req.method} ${req.originalUrl} | ${result.message} | ${result.status}`);
      return res.status(result.status).json({
        errors: {
          default: result.message,
        },
      });
    }

    return res.status(StatusCodes.CREATED).json()
}