import { useEffect, useState } from "react";
import countriesService from "./services/countries";

function App() {
  const [searchCountry, setSearchCountry] = useState(undefined);
  const [initialCountries, setInitialCountries] = useState([]);
  const [foundCountries, setFoundCountries] = useState(null);

  function handleSearchCountry(ev) {
    setSearchCountry(ev.target.value);
  }

  // GET ALL Countries in first render
  useEffect(() => {
    countriesService
      .getAll()
      .then((countriesReturned) => setInitialCountries(countriesReturned));
  }, []);

  // GET matching Countries by searchTerm
  useEffect(() => {
    if (searchCountry) {
      const countries = initialCountries
        .filter((c) =>
          c.name.common.toLowerCase().includes(searchCountry.toLowerCase())
        )
        .reduce((acc, country) => {
          // console.log(acc, country);
          acc.push({ name: country.name.common });
          return acc;
        }, []);

      setFoundCountries(countries);
    } else {
      setFoundCountries([]);
    }
  }, [searchCountry]);

  // console.log(foundCountries);
  return (
    <div>
      <div>
        <label htmlFor="find">find countries: </label>
        <input
          type="text"
          id="find"
          value={searchCountry}
          onChange={handleSearchCountry}
        />
      </div>
      <div>
        {foundCountries && foundCountries.length <= 10 ? (
          <ul>
            {Array.isArray(foundCountries)
              ? foundCountries.map((country) => (
                  <li key={country.name}>{country.name}</li>
                ))
              : foundCountries}
          </ul>
        ) : (
          <p>Too many matches, specify another filter</p>
        )}
      </div>
    </div>
  );
}

export default App;
