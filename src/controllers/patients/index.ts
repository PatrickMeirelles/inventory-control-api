import * as register from "./register";
import * as read from "./read";
import * as getById from "./getById";
import * as updateById from "./updateById";
import * as deleteById from "./deleteById";

export const PatientsController = {
  ...register,
  ...read,
  ...getById,
  ...updateById,
  ...deleteById,
};