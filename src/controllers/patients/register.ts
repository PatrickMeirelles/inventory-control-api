import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { PatientsProvider } from "../../database/providers/patients";
import { validation } from "../../middlewares/auth";
import { IPatients } from "../../models/Patients";

interface IBodyProps extends Omit<IPatients, "id" | "nome"> { }

export const registerValidation = validation({
    body: yup.object().shape({
        name: yup.string().required(),
        document: yup.string().required(),
        clinic: yup.string().required(),
    }),
});

export const register = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    const result = await PatientsProvider.create(req.body);
  
    if (result instanceof Error) {
      console.log(`${req.method} ${req.originalUrl} | ${result.message} | ${result.status}`);
      return res.status(result.status).json({
        errors: {
          default: result.message,
        },
      });
    }
    console.log(req);
    return res.status(StatusCodes.CREATED).json()
}