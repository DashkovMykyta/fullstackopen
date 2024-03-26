import express from "express";
import cors from "cors";

//Routers
import diagnosesRouter from "./modules/diagnoses";
import patientsRouter from "./modules/patients";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

//Routes
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.get("/api/ping", (_req, res) => {
  console.log("Someone pinged here");
  res.send("pong").status(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
