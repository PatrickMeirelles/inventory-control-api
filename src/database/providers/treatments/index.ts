import * as create from "./create";
import * as read from "./getById";
import * as deleteById from "./deleteById";
import * as updateById from "./updateById";

export const TreatmentProvider = {
  ...create,
  ...read,
  ...deleteById,
  ...updateById
};