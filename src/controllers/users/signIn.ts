import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { UsersProvider } from "../../database/providers/users";
import { validation } from "../../middlewares/auth";
import { IUsers } from "../../models/Users";
import { Crypto, tokenJwt } from "../../utils";

interface IBodyProps extends Omit<IUsers, "id" | "nome"> {}

export const signInValidation = validation({
  body: yup.object().shape({
    password: yup.string().required().min(6),
    email: yup.string().required().email().min(5),
  }),
});

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await UsersProvider.getByEmail(email);
  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email or password are invalid",
      },
    });
  }

  const matchPassword = await Crypto.verifyPassword(password, user.password);
  if (!matchPassword) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email or password are invalid",
      },
    });
  } else {
    const accessToken = tokenJwt.sign({ uid: user.id });
    if (accessToken === '"JWT_SECRET_KEY_NOT_FOUND"') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Error to generate token",
        },
      });
    }

    return res.status(StatusCodes.OK).json({ accessToken });
  }
};