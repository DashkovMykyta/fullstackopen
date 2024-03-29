import type { OccupationalHealthcareEntry } from "../../types";

function OccupationalHealthcareEntry({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) {
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
      {" "}
      <h3>
        {entry.date} <i>{entry.description}</i>
      </h3>
      <p>Employer: {entry.employerName}</p>
      <p>Specialist: {entry.specialist}</p>
      <p>
        Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
      </p>
    </div>
  );
}

export default OccupationalHealthcareEntry;
