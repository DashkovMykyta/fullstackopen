import React from "react";
import Header from "../components/Header";
import Content from "../components/course/Content";
import Total from "../components/course/Total";

function Course({ course }) {
  return (
    <div>
      <Header text={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
}

export default Course;
