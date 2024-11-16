import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { TreatmentProvider } from "../../database/providers/treatments";
import { validation } from "../../middlewares/auth";
import { ITreatments } from "../../models/Treatments";

interface IBodyProps extends Omit<ITreatments, "id" | "nome"> { }

export const registerValidation = validation({
    body: yup.object().shape({
        name: yup.string().required(),
    }),
});

export const register = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    const result = await TreatmentProvider.create(req.body);
  
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