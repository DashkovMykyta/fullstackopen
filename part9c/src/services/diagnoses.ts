import data from "../data/diagnoses";
import { Diagnosis } from "../types";
const diagnosesService = {
  getDiagnoses(): Diagnosis[] {
    return data;
  },
};

export default diagnosesService;
