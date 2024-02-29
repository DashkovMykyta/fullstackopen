import React, { useState } from "react";
const statsTexts = ["good", "neutral", "bad", "all", "average", "positive"];

export default function Unicafe() {
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const [show, setShow] = useState(false);

  const handleChangeStats = (type) => {
    !show && setShow(true);
    setStats({ ...stats, [type]: stats[type] + 1 });
  };

  const renderStats = (type) => {
    const stateStats = statsTexts.slice(0, -2);
    if (stateStats.includes(type)) return stats[type];

    switch (type) {
      case "all":
        return stats.good + stats.neutral + stats.bad;
      case "average":
        return (
          (stats.good - stats.bad) / (stats.good + stats.neutral + stats.bad)
        );
      case "positive":
        return (
          (stats.good / (stats.good + stats.neutral + stats.bad)) * 100 + " %"
        );
      default:
        return 0;
    }
  };
  return (
    <>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>
      <Button text="good" handleClick={() => handleChangeStats("good")} />
      <Button text="neutral" handleClick={() => handleChangeStats("neutral")} />
      <Button text="bad" handleClick={() => handleChangeStats("bad")} />

      <h2>Statistics</h2>
      {show ? (
        <table>
          <tbody>
            {statsTexts.map((text, i) => (
              <Statistic key={i} value={renderStats(text)} name={text} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
}

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({ value, name }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
};
