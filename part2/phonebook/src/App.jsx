import { useState } from "react";

const Person = ({ name, number }) => {
  return (
    <>
      <li>
        {name} {number}
      </li>
      <br />
    </>
  );
};

const Search = ({ searchValue, handleSearch }) => {
  return (
    <div>
      filter shown with
      <input type="text" value={searchValue} onChange={handleSearch} />
    </div>
  );
};

function App() {
  const [originalPeople, setOriginalPeople] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [people, setPeople] = useState(originalPeople);

  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [searchValue, setSearchValue] = useState();

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
        id: people.length + 1,
      };
      const updatedPeople = people.concat(newObj);
      setPeople(updatedPeople);
      setOriginalPeople(updatedPeople);
      setNewName("");
      setNewPhoneNumber("");
      setSearchValue("");
    }
  };

  const handleSearch = (ev) => {
    const searchTerm = ev.target.value.toLowerCase();
    setSearchValue(searchTerm);

    if (!searchTerm) {
      setPeople(originalPeople);
    } else {
      const filteredPeople = originalPeople.filter((person) =>
        person.name.toLowerCase().includes(searchTerm)
      );
      setPeople(filteredPeople);
    }
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <Search searchValue={searchValue} handleSearch={handleSearch} />
      <br />
      <form onSubmit={addName}>
        <div>
          name:
          <br />
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone number:
          <br />
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
        {people.map((person) => (
          <Person key={person.name} name={person.name} number={person.number} />
        ))}
      </ul>
    </div>
  );
}

export default App;
