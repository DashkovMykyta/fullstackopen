import React, { useState } from "react";
import phonebookService from "../../services/phonebook";

export default function Form({ persons, setPersons, setError }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const existing = persons.find((person) => person.name === name);
      if (existing) {
        if (existing.number === number) {
          alert(`${name} is already added to phonebook`);
          return;
        }

        const text = `${name} is already added to phonebook, replace the old number with a new one?`;

        //Update number if person exists
        if (window.confirm(text)) {
          await handleExisting(existing, setError);
          return;
        }
      }

      //Create new person object
      const newPerson = { name, number };

      //Create new person
      const created = await phonebookService.create(newPerson, setError);
      if (created) {
        setPersons(persons.concat(created));
        setName("");
        setNumber("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleExisting = async (existing) => {
    // Update
    const updatedPerson = await phonebookService.update(
      existing,
      existing,
      setError
    );

    if (updatedPerson) {
      setPersons(
        persons.map((person) =>
          person.id !== existing.id ? person : updatedPerson
        )
      );

      setName("");
      setNumber("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input value={number} onChange={(e) => setNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
