import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  return res.status(200).send("Shippify Project");
});

export { router };