import patients from "../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";
import toNewPatient from "../utils";
const convertedPatients: Patient[] = patients.map((e) => {
  const obj = toNewPatient(e) as Patient;
  obj.id = e.id.toString();
  return obj;
});

const patiesntsService = {
  getPatients: (): NonSensitivePatient[] => {
    return convertedPatients.map((e) => ({ ...e, ssn: undefined }));
  },
  addPatient: (data: NewPatient): Patient => {
    const newPatient = {
      id: uuid(),
      ...data,
    };

    patients.push(newPatient);
    return newPatient;
  },
  getPatient: (id: string): Patient | undefined => {
    console.log("patients", patients);

    const patient = convertedPatients.find((e) => e.id === id);

    return patient;
  },
};

export default patiesntsService;
