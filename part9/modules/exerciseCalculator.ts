import express from "express";

const exerciseRouter = express.Router();

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (
  daily_exercises: Array<number>,
  target: number
): Result => {
  console.log(daily_exercises);
  console.log(target);
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((d) => d > 0).length;
  const average = daily_exercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = average < target ? 1 : average === target ? 2 : 3;
  const ratingDescription =
    rating === 1
      ? "not too bad but could be better"
      : rating === 2
      ? "You reached your target"
      : "You exceeded your target";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

exerciseRouter.post("/", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body as {
    daily_exercises: Array<number>;
    target: number;
  };

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (!Array.isArray(daily_exercises) || typeof target !== "number") {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = exerciseCalculator(daily_exercises, target);
  res.json(result);
});

export default exerciseRouter;
