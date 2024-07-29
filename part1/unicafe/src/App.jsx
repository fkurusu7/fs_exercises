import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, all }) => {
  const GOOD_C = 1;
  const NEUTRAL_C = 0;
  const BAD_C = -1;
  console.log("sum by cat:", good * GOOD_C + neutral * NEUTRAL_C + bad * BAD_C);
  const average = (good * GOOD_C + neutral * NEUTRAL_C + bad * BAD_C) / all;
  const positive = (good / all) * 100;

  return (
    <>
      {" "}
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleAll = () => good + neutral + bad;

  const handleGood = () => {
    setGood(good + 1);
    setAll(1 + handleAll());
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(1 + handleAll());
  };
  const handleBad = () => {
    setBad(bad + 1);
    setAll(1 + handleAll());
  };
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />

      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
