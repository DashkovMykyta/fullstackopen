export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Genders {
  Female = "female",
  Male = "male",
  other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Genders;
  occupation: string;
}

export interface UnknownPatient {
  name?: unknown;
  dateOfBirth?: unknown;
  ssn?: unknown;
  gender?: unknown;
  occupation?: unknown;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;
