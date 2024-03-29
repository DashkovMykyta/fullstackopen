import type { HospitalEntry } from "../../types";

function HospitalEntry({ entry }: { entry: HospitalEntry }) {
  return (
    <div
      style={{
        border: 1,
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        padding: 10,
      }}
    >
      <h3>
        {entry.date} <i>{entry.description}</i>
      </h3>
      <p>
        Discharged on {entry.discharge.date} with criteria:{" "}
        {entry.discharge.criteria}
      </p>
      <p>diagnosed by {entry.specialist} </p>
    </div>
  );
}

export default HospitalEntry;
