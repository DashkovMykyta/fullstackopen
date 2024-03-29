import React from "react";
import type { HealthCheckEntry } from "../../types";

function HealthCheckEntry({ entry }: { entry: HealthCheckEntry }) {
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
      <p>Specialist: {entry.specialist}</p>
      <p>Health rating: {entry.healthCheckRating}</p>
    </div>
  );
}

export default HealthCheckEntry;
