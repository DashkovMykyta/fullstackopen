import axios from "axios";
const baseUrl = "/api/persons";

//Get all numbers
const getAll = async (setError) => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (error) {
    alert("Error fetching data");
    console.error(error);
  }
};

//Create a new number
const create = async (newObject, setError) => {
  try {
    const res = await axios.post(baseUrl, newObject);

    setError({
      message: `${newObject.name} successfully created`,
      type: "success",
    });
    return res.data;
  } catch (error) {
    setError({ message: `Error while creating`, type: "error" });
    console.error(error);
  }
};

//Update a number
const update = async (person, newObject, setError) => {
  try {
    const res = await axios.put(`${baseUrl}/${person.id}`, newObject);

    setError({
      message: `${person.name} successfully updated`,
      type: "success",
    });
    return res.data;
  } catch (error) {
    alert("Error updating note");
    setError({ message: `Error while updating`, type: "error" });
    console.error(error);
  }
};

//Delete a umber
const remove = async (person, setError) => {
  try {
    const res = await axios.delete(`${baseUrl}/${person.id}`);

    setError({
      message: `${person.name} successfully deleted`,
      type: "success",
    });
    return res.data;
  } catch (error) {
    setError({ message: `${person.name} was already deleted`, type: "error" });
    console.error(error);
  }
};

export default { getAll, create, update, remove };
