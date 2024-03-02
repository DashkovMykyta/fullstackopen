const Total = ({ course }) => {
  const total = course.parts.reduce((a, c) => a + c.exercises, 0);
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

export default Total;
