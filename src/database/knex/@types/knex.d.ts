import { IUsers } from "../../../models/Users";
import { IConsults } from "../../../models/Consults";
import { ITreatments } from "../../../models/Treatments";
import { IPatients } from "../../../models/Patients";
declare module "knex/types/tables" {
  interface Tables {
    users: IUsers;
    consults: IConsults;
    treatments: ITreatments;
    patients: IPatients;
  }
}