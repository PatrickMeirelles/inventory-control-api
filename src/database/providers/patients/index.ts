import * as create from "./create";
import * as read from "./read";
import * as getById from "./getById";
import * as updateById from "./updateById";
import * as deleteById from "./deleteById";

export const PatientsProvider = {
  ...create,
  ...read,
  ...getById,
  ...updateById,
  ...deleteById,
};