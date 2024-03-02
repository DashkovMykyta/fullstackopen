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

  return filteredPersons.map((person) => (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p key={person.id}>
        {person.name} {person.number}
      </p>
      <button onClick={() => handleDelete(person)}>delete</button>
    </div>
  ));
}
