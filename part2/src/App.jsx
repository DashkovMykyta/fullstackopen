import { useState } from "react";
import Course from "./course/Course";
import Phonebook from "./phonebook/Phonebook";
import Countries from "./countries/Countries";

const App = () => {
  const [show, setShow] = useState("Countries");
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const components = {
    Course: courses.map((course) => <Course key={course.id} course={course} />),
    Phonebook: <Phonebook />,
    Countries: <Countries />,
  };

  return (
    <>
      <nav>
        <button onClick={() => setShow("Course")}>Course</button>
        <button onClick={() => setShow("Phonebook")}>Phonebook</button>
        <button onClick={() => setShow("Countries")}>Countries</button>
      </nav>
      <hr />
      {show && (
        <>
          <h1>{show}</h1>
          {components[show]}
        </>
      )}
    </>
  );
};

export default App;
