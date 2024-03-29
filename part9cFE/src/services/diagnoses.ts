import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const get = async (code: string) => {
  const { data } = await axios.get<Diagnosis>(
    `${apiBaseUrl}/diagnoses/${code}`
  );

  return data;
};

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

export default {
  get,
  getAll,
};
