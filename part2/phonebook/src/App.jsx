import { useState } from "react";

function App() {
  const [people, setPeople] = useState([{ name: "Fer Cruz" }]);

  const [newName, setNewName] = useState("");

  const handleChange = (ev) => {
    setNewName(ev.target.value);
  };

  const addName = (ev) => {
    ev.preventDefault();
    const nameAlreadyExists = people.some((person) => person.name === newName);

    if (nameAlreadyExists) {
      console.log(people);
      console.log(`nameAlreadyExists ${newName} `, nameAlreadyExists);
      alert(`${newName} is already added to phonebook`);
    } else {
      const newObj = {
        name: newName,
      };
      setPeople(people.concat(newObj));
    }
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
        {people.map((person) => {
          return <li key={person.name}>{person.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
