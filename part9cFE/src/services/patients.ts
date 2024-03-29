import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const addCode = async (id: string | undefined, code: string | undefined) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/codes`,
    { code }
  );

  return data;
};

export default {
  getAll,
  create,
  get,
  addCode,
};
