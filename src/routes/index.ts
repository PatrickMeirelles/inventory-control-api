import { Router } from "express";
import { 
  UsersController, 
  PatientsController, 
  ConsultsController, 
  TreatmentsController 
} from "./../controllers";
import { ensureAuth } from "../middlewares/auth";
  
const router = Router();

router.get("/", (_, res) => {
  return res.status(200).send("Invetory Control");
});

// ----------- USERS ROUTES ---------------
router.post(
  "/users/signin",
  UsersController.signInValidation,
  UsersController.signIn
);
router.post(
  "/users/signup",
  UsersController.signUpValidation,
  UsersController.signUp
);

// ----------- PATIENTS ROUTES ---------------
router.post(
  "/patients/register",
  ensureAuth,
  PatientsController.registerValidation,
  PatientsController.register
);

// ----------- CONSULTS ROUTES --------------
router.post(
  "/consult/register",
  ensureAuth,
  ConsultsController.registerValidation,
  ConsultsController.register
);

// ------------ TREATMENT ROUTES -------------
router.post(
  "/treatment/register",
  ensureAuth,
  TreatmentsController.registerValidation,
  TreatmentsController.register
);

export { router };