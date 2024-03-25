import express from "express";

const bmiRouter = express.Router();

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

// Removed the Result type from the function signature
bmiRouter.get("/", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  console.log(req.query);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const bmi = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi,
  });
});

export default bmiRouter;
