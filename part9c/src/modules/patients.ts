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

patientsRouter.get("/:id", (req, res) => {
  console.log("Patient data requested");
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    res.send(patient).status(200);
  } else {
    res.sendStatus(404);
  }
});

patientsRouter.post("/:id/codes", (req, res) => {
  console.log("Patient data posted");
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    const updatedPatient = {
      ...patient,
      diagnosisCodes: patient.diagnosisCodes.concat(req.body.code),
    };
    res.send(updatedPatient).status(200);
  } else {
    res.sendStatus(404);
  }
});

export default patientsRouter;
