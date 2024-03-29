import express from "express";
import diagnosesService from "../services/diagnoses";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  console.log("Diagnoses data requested");

  const data = diagnosesService.getDiagnoses();

  res.send(data).status(200);
});

diagnosesRouter.get("/:code", (req, res) => {
  console.log("Diagnoses data requested");

  const data = diagnosesService.getDiagnosis(req.params.code);

  if (data) {
    res.send(data).status(200);
  } else {
    res.sendStatus(404);
  }
});

export default diagnosesRouter;
