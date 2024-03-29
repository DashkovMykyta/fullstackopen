import data from "../data/diagnoses";
import { Diagnosis } from "../types";
const diagnosesService = {
  getDiagnoses(): Diagnosis[] {
    return data;
  },
  getDiagnosis(code: string): Diagnosis | undefined {
    return data.find((d) => d.code === code);
  },
};

export default diagnosesService;
