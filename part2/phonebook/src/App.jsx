import { useEffect } from "react";
import { useState } from "react";
import phonebookServices from "./services/phonebook";

const Person = ({ name, number, onDelete }) => {
  return (
    <>
      <li>
        {name} {number} <button onClick={onDelete}>delete</button>
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
  const [people, setPeople] = useState([]);
  const [originalPeople, setOriginalPeople] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    phonebookServices.getAll().then((initialPeople) => {
      setPeople(initialPeople);
      setOriginalPeople(initialPeople);
    });
  }, []);

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
      alert(`${newName} is already added to phonebook`);
    } else {
      const newObj = {
        name: newName,
        number: newPhoneNumber,
      };

      phonebookServices.create(newObj).then((returnedPerson) => {
        setPeople(people.concat(returnedPerson));
        setNewName("");
        setNewPhoneNumber("");
      });
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

  const handleDeletion = (id) => {
    console.log(id);
    var result = confirm("Do you want to delete it?");

    if (result) {
      const response = phonebookServices.deleteP(id).then((returnedDeleted) => {
        console.log(returnedDeleted);
        setPeople([
          ...people,
          people.filter((person) => {
            console.log(person.id !== returnedDeleted.id);
            return person.id !== returnedDeleted.id;
          }),
        ]);
      });
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
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            onDelete={() => handleDeletion(person.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
