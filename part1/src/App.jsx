import { useState } from "react";
import Excercises105 from "./first-five/excercises";
import Unicafe from "./unicafe/main";
import Anecdotes from "./anecdotes/main";

const App = () => {
  return (
    <>
      <h1>1.01-1.05 excersises</h1>
      <Excercises105 />

      <hr />
      <Unicafe />

      <hr />
      <Anecdotes />
    </>
  );
};

export default App;
