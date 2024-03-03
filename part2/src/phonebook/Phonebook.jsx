import React, { useEffect } from "react";
import { useState } from "react";
import Filter from "../components/phonebook/Filter";
import Form from "../components/phonebook/Form";
import Content from "../components/phonebook/Content";
import phonebookService from "../services/phonebook";

function Phonebook() {
  const [search, setSearch] = useState("");
  const [persons, setPersons] = useState([]);
  const [error, setError] = useState(null);
  console.log("persons", persons);
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    //Get data
    (async () => {
      const res = await phonebookService.getAll();
      setPersons(res);
    })();
  }, []);
  return (
    <div>
      {error && (
        <div className={error.type}>
          <h2>{error.message}</h2>
        </div>
      )}

      <h2>Search</h2>
      <Filter search={search} setSearch={setSearch} />

      <h2>Add new</h2>
      <Form persons={persons} setPersons={setPersons} setError={setError} />

      <h2>Numbers</h2>
      <Content
        filteredPersons={filteredPersons}
        setPersons={setPersons}
        persons={persons}
        setError={setError}
      />
    </div>
  );
}

export default Phonebook;
