import { Entry, Genders, NewPatient, UnknownPatient } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
  if (typeof object !== "object" || object === null || Array.isArray(object)) {
    throw new Error("Provided data is not an object");
  }
  const patientObject = object as UnknownPatient;

  const newPatient: NewPatient = {
    name: parseString(patientObject.name),
    dateOfBirth: parseDate(patientObject.dateOfBirth),
    ssn: parseString(patientObject.ssn),
    gender: parseGender(patientObject.gender),
    occupation: parseString(patientObject.occupation),
    entries: parseEntries(patientObject.entries),
  };

  return newPatient;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Genders => {
  return Object.values(Genders)
    .map((e) => e.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Genders => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error("Incorrect or missing entries: " + entries);
  }
  return entries;
};

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error("Incorrect or missing string: " + string);
  }
  return string;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

export default toNewPatient;
