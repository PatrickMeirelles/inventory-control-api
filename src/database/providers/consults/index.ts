import * as create from "./create";
import * as deleteById from "./deleteById";
import * as getById from "./getById";
import * as updateById from "./updateById";

export const ConsultsProvider = {
  ...create,
  ...deleteById,
  ...getById,
  ...updateById,
};