import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Fer Cruz" }]);

  const [newName, setNewName] = useState("");

  const handleChange = (ev) => {
    setNewName(ev.target.value);
  };

  const addName = (ev) => {
    ev.preventDefault();
    console.log(newName);
    const newObj = {
      name: newName,
    };
    setPersons(persons.concat(newObj));
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <form onSubmit={addName}>
        <div>
          name: <input type="text" value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return <li key={person.name}>{person.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
