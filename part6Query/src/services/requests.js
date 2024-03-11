import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const retrieveAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (content) => {
  const res = await axios.post(baseUrl, content);
  return res.data;
};
//Test
const getAnecdote = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const updateVotes = async (id) => {
  const anecdote = await getAnecdote(id);
  anecdote.votes += 1;
  const res = await axios.put(`${baseUrl}/${id}`, anecdote);
  return res.data;
};

export default { retrieveAll, create, updateVotes };
