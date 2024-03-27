// import "./App.css";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import { Entry } from "./types";
import entriesService from "./services/entries";

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const patients = await entriesService.getAll();
      setEntries(patients);
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Add new entry</h1>
      <Form setEntries={setEntries} entries={entries} />
      <h1>Diary entries</h1>
      {entries?.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </>
  );
}

const EntryCard = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>Visibility: {entry.visibility}</p>
      <p>Weather: {entry.weather}</p>
    </div>
  );
};

export default App;
