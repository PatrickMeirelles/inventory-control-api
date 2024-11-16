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

router.get(
  "/patients",
  ensureAuth,
  PatientsController.read
);

router.get(
  "/patients/:id",
  ensureAuth,
  PatientsController.getById
);

router.put(
  "/patients/:id",
  ensureAuth,
  PatientsController.registerValidation,
  PatientsController.updateById
);

router.delete(
  "/patients/:id",
  ensureAuth,
  PatientsController.deleteById
);

// ----------- CONSULTS ROUTES --------------
router.post(
  "/consult/register",
  ensureAuth,
  ConsultsController.registerValidation,
  ConsultsController.register
);

router.get(
  "/consult/:id",
  ensureAuth,
  ConsultsController.getById
);

router.put(
  "/consult/:id",
  ensureAuth,
  ConsultsController.registerValidation,
  ConsultsController.updateById
);

router.delete(
  "/consult/:id",
  ensureAuth,
  ConsultsController.deleteById
);

// ------------ TREATMENT ROUTES -------------
router.post(
  "/treatment/register",
  ensureAuth,
  TreatmentsController.registerValidation,
  TreatmentsController.register
);

router.get(
  "/treatment/:id",
  ensureAuth,
  TreatmentsController.getById
);

router.put(
  "/treatment/:id",
  ensureAuth,
  TreatmentsController.registerValidation,
  TreatmentsController.updateById
);

router.delete(
  "/treatment/:id",
  ensureAuth,
  TreatmentsController.deleteById
);

export { router };