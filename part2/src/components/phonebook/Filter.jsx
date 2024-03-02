import React from "react";

export default function Filter({ search, setSearch }) {
  return (
    <div>
      search for:{" "}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
}
