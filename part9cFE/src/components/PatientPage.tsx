import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../types";
import diagnoses from "../services/diagnoses";
import HospitalEntry from "./Entries/HospitalEntry";
import OccupationalHealthcareEntry from "./Entries/OccupationalHealthcareEntry";
import HealthCheckEntry from "./Entries/HealthCheckEntry";
import patients from "../services/patients";

function PatientPage({ patient }: { patient: Patient | null | undefined }) {
  // const [codes, setCodes] = useState<Diagnosis[]>([]);
  const [codeData, setCodeData] = useState<Diagnosis[] | null>(null);
  console.log("patient", patient);
  const handleNew = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("new code");
      const selectedCode = e.currentTarget.querySelector("select")?.value;
      const res = patients.addCode(patient?.id, selectedCode);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const retrieveCodes = async () => {
  //     if (!patient || !patient.entries) return;

  //     const promises: Promise<Diagnosis>[] = [];

  //     patient.entries.forEach((entry) => {
  //       entry.diagnosisCodes?.forEach((code) => {
  //         const diagnosisPromise = diagnoses.get(code); // Assuming this returns Promise<Diagnosis>
  //         promises.push(diagnosisPromise);
  //       });
  //     });

  //     const codes: Diagnosis[] = await Promise.all(promises);
  //     setCodes(codes);
  //   };

  //   if (patient) {
  //     retrieveCodes();
  //   }
  // }, [patient]); // Consider adding `patient

  useEffect(() => {
    const getCodes = async () => {
      const codes = await diagnoses.getAll();

      setCodeData(codes);
    };
    getCodes();
  }, []);
  return (
    <div>
      <h1>{patient?.name}</h1>
      <p>ssh: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <br />
      <h3>Add code</h3>
      <form onSubmit={handleNew}>
        <select>
          {codeData?.map((code) => (
            <option key={code.code} value={code.code}>
              {code.code}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
      <h3>entries</h3>
      {renderEntries(patient?.entries)}
    </div>
  );
}

const renderEntries = (entries: Patient["entries"] | undefined) => {
  return entries?.map((entry) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry key={entry.id} entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry key={entry.id} entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntry key={entry.id} entry={entry} />;
    }
  });
};

export default PatientPage;
