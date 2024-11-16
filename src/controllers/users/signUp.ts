import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { UsersProvider } from "../../database/providers/users";
import { validation } from "../../middlewares/auth";
import { IUsers } from "../../models/Users";

interface IBodyProps extends Omit<IUsers, "id"> {}

export const signUpValidation = validation({
  body: yup.object().shape({
    name: yup.string().required().min(3),
    password: yup.string().required().min(6),
    email: yup.string().required().email().min(5),
  }),
});

export const signUp = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await UsersProvider.create(req.body);
  
  if (result instanceof Error) {
    console.log(`${req.method} ${req.originalUrl} | ${result.message} | ${result.status}`);
    return res.status(result.status).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};