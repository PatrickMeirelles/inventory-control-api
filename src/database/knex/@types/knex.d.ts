import { IUsers } from "../../models";
declare module "knex/types/tables" {
  interface Tables {
    users: IUsers;
  }
}