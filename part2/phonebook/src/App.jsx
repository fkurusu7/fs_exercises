import { useState } from "react";

function App() {
  const [people, setPeople] = useState([
    { name: "Fer Cruz", number: "575757575" },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const handleNameChange = (ev) => {
    setNewName(ev.target.value);
  };
  const handleNumberChange = (ev) => {
    setNewPhoneNumber(ev.target.value);
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
        number: newPhoneNumber,
      };
      setPeople(people.concat(newObj));
    }
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <form onSubmit={addName}>
        <div>
          name:
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone number:
          <input
            type="text"
            value={newPhoneNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {people.map((person) => {
          return (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
