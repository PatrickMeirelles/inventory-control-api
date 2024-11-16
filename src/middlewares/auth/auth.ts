import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { tokenJwt } from "../../utils";

export const ensureAuth: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Invalid token, User not authorized",
      },
    });
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Invalid token, User not authorized",
      },
    });
  }

  const jwtData = tokenJwt.verify(token);
  if (jwtData === "JWT_SECRET_KEY_NOT_FOUND") {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Error to verificate the token",
      },
    });
  } else if (jwtData === "INVALID_TOKEN") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Invalid token, User not authorized",
      },
    });
  }

  req.headers.id = jwtData.uid.toString();

  return next();
};