import * as register from "./register";
import * as deleteById from "./deleteById";
import * as getById from "./getById";
import * as updateById from "./updateById";

export const ConsultsController = {
  ...register,
  ...deleteById,
  ...getById,
  ...updateById,
};