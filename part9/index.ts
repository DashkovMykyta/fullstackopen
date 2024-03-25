import express from "express";
import bmiRouter from "./modules/bmiCalculator";
import exerciseRouter from "./modules/exerciseCalculator";

const app = express();
app.use(express.json());

app.use("/bmi", bmiRouter);
app.use("/exercises", exerciseRouter);
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
