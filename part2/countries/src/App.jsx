import { useEffect, useState } from "react";
import countriesService from "./services/countries";

function Country({ country }) {
  return (
    <div className="country" key={country.id}>
      <h1>{country.name}</h1>
      <div className="info">
        <p>
          Capital <span>{country.capital}</span>
        </p>
        <p>
          Area <span> {country.area}</span>
        </p>
        <h2>Languages:</h2>
        <ul>
          {Object.entries(country.langs).map(([_, value], idx) => (
            <li key={country.id + idx}>{value}</li>
          ))}
        </ul>
      </div>
      <div className="flag">{country.flag}</div>
    </div>
  );
}

function App() {
  const [searchCountry, setSearchCountry] = useState("");
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
        .reduce((acc, country, currIdx) => {
          // console.log(acc, country);
          acc.push({
            id: country.name.common + country.area + currIdx,
            name: country.name.common,
            capital: country.capital,
            area: country.area,
            langs: country.languages,
            flag: country.flag,
          });
          return acc;
        }, []);

      console.log(countries);
      setFoundCountries(countries);
    } else {
      setFoundCountries([]);
    }
  }, [searchCountry]);

  function handleShowCountry(name) {
    // console.log(name);
    // console.log(foundCountries);
    // const country = foundCountries.filter((c) => c.name === name);
    // console.log(country);
    setFoundCountries(foundCountries.filter((c) => c.name === name));
  }

  return (
    <div className="container">
      <div className="search">
        <label htmlFor="find">find countries info</label>
        <input
          type="text"
          id="find"
          value={searchCountry}
          onChange={handleSearchCountry}
        />
      </div>
      <div className="found-countries">
        {foundCountries && foundCountries.length <= 10 ? (
          foundCountries.length === 1 ? (
            <Country country={foundCountries[0]} />
          ) : (
            <ul className="countries-list">
              {foundCountries.map((country) => (
                <li key={country.id}>
                  <span>{country.name}</span>
                  <button
                    className="btn"
                    onClick={() => handleShowCountry(country.name)}
                  >
                    show
                  </button>
                </li>
              ))}
            </ul>
          )
        ) : (
          <p className="too-many-countries">
            Too many matches, specify another filter
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
