import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const getCountry = async (countryName) => {
  const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`;
  const response = await axios.get(baseUrl);
  return response.data;
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (name) {
        try {
          const data = await getCountry(name);
          setCountry({
            found: true,
            data: {
              name: data.name.common,
              capital: data.capital[0],
              population: data.population,
              flag: data.flags.png,
            },
          });
        } catch (error) {
          console.log(error.message);
          setCountry({ found: false });
        }
      }
    };
    fetchData();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (ev) => {
    ev.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button onClick={fetch}>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
