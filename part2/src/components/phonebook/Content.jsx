import React from "react";
import phonebookService from "../../services/phonebook";

export default function Content({
  filteredPersons,
  persons,
  setPersons,
  setError,
}) {
  const handleDelete = async (data) => {
    if (window.confirm("Do you really want to delete?")) {
      await phonebookService.remove(data, setError);
      setPersons(persons.filter((person) => person.id !== data.id));
    }
  };

  if (persons.length === 0) return <p>Loading</p>;
  return filteredPersons.map((person) => (
    <div key={person.id} style={{ display: "flex", flexDirection: "row" }}>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={() => handleDelete(person)}>delete</button>
    </div>
  ));
}
