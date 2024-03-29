import React, { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];
export default function Anecdotes() {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getRandom = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const handleClick = () => {
    setSelected(getRandom());
  };

  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };
  return (
    <>
      <h1>Anecdotes</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {anecdotes[selected]}
        <br />
        {`has ${votes[selected]} votes`}
        <div>
          <button onClick={handleVotes}>vote</button>
          <button
            style={{ alignSelf: "flex-start", marginTop: "20px" }}
            onClick={handleClick}
          >
            next anecdote
          </button>
        </div>
      </div>
      <h2>Anecdote with most votes</h2>
      {anecdotes[votes.indexOf(Math.max(...votes))]}
      <br />
      {`has ${Math.max(...votes)} votes`}
    </>
  );
}
