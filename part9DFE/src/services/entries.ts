import axios from "axios";
import { apiBaseUrl } from "../main";
import { Entry, EntryFormValues } from "../types";

const getAll = async (): Promise<Entry[]> => {
  const res = await axios.get<Entry[]>(`${apiBaseUrl}/diaries`);

  return res.data;
};

const create = async (object: EntryFormValues) => {
  const res = await axios.post<Entry>(`${apiBaseUrl}/diaries`, object);

  return res;
};

export default {
  getAll,
  create,
};
