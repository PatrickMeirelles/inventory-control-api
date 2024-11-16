import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

type TProp = "body" | "header" | "params" | "query";
type TSchemas = Record<TProp, yup.ObjectSchema<any>>;

type TValidate = (schemas: Partial<TSchemas>) => RequestHandler;

export const validation: TValidate = (schemas) => async (req, res, next) => {
  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProp], { abortEarly: false });
    } catch (err) {
      const yupError = err as yup.ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach((err) => {
        if (!err.path) return;
        errors[err.path] = err.message;
      });

      errorsResult[key] = errors;
    }
  });

  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
  }
};