import express from "express";
import diagnosesService from "../services/diagnoses";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  console.log("Diagnoses data requested");

  const data = diagnosesService.getDiagnoses();

  res.send(data).status(200);
});

export default diagnosesRouter;
