import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const create = async (anecdote) => {
  const res = await axios.post(baseUrl, anecdote);
  return res.data;
};

const updateVotes = async (id) => {
  const anec = await getById(id);
  anec.votes += 1;
  const res = await axios.put(`${baseUrl}/${id}`, anec);
  return res.data;
};

export default { getAll, getById, create, updateVotes };
