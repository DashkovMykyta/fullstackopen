import React from "react";

export default function Excercises105() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
}

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Content = ({ course }) => {
  return course.parts.map((part, i) => (
    <p key={i}>
      {part.name} {part.exercises}
    </p>
  ));
};

const Total = ({ course }) => {
  let total = 0;
  course.parts.forEach((part) => {
    total += part.exercises;
  });
  return <p>Number of exercises {total}</p>;
};
