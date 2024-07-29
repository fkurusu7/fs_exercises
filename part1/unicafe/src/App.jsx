import { useState } from "react";

const ANECDOTES = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td style={{ padding: "0 15px" }}>{text}</td>
      <td style={{ padding: "0 15px" }}>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad, all }) => {
  if (!good && !neutral && !bad) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }

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
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};

const Anedocte = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(() => {
    const anecdotesObj = {};
    ANECDOTES.forEach((_, index) => {
      anecdotesObj[index] = 0;
    });
    return anecdotesObj;
  });

  console.log("VOTES: ", votes);
  const handleSelected = () => {
    const randomNum = Math.random() * ANECDOTES.length;
    const index = Math.floor(randomNum);
    console.log(randomNum, index);
    setSelected(index);
  };

  const handleVote = () => {
    setVotes({ ...votes, [selected]: votes[selected] + 1 });
  };

  const showAnecdoteWithMostVotes = () => {
    const maxEntry = Number(
      Object.entries(votes).reduce(
        (maxValue, current) => {
          console.log(current, maxValue);
          return current[1] > maxValue[1] ? current : maxValue;
        },
        [null, -Infinity]
      )[0]
    );
    console.log(maxEntry);
    return ANECDOTES[maxEntry];
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <p>{ANECDOTES[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={handleSelected} />
      <h2>Anecdote with most votes</h2>
      <p>{showAnecdoteWithMostVotes()}</p>
    </div>
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
      <Anedocte />
    </div>
  );
};

export default App;
