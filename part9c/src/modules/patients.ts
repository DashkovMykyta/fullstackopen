import express from "express";

import patientsService from "../services/patients";
import toNewPatient from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  console.log("Patients data requested");
  res.send(patientsService.getPatients());
});

patientsRouter.post("/", (_req, res) => {
  console.log("Patient data posted");
  const newPatient = toNewPatient(_req.body);

  const addedPatient = patientsService.addPatient(newPatient);
  res.send(addedPatient).status(200);
});

export default patientsRouter;
