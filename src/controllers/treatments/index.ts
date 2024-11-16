import * as register from "./register";
import * as getById from "./getById";
import * as updateById from "./updateById";
import * as deleteById from "./deleteById";

export const TreatmentsController = {
  ...register,
  ...getById,
  ...updateById,
  ...deleteById,
};