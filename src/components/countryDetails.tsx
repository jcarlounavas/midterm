import React from 'react'
import { useEffect, useState } from 'react'

const CountryDetails = () => {
    const [nations, setNations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('Afghanistan');
    const [dropDown, setDropDown] = useState('');
    const [regions, setRegions] = useState([]);


    const countriesList = nations.filter((nation) =>
    {
      const searchNation = search
      ? nation.name.toLowerCase().includes(search.toLowerCase()) : true;
      const regionMatch = dropDown ? nation.region === dropDown : true;

      return searchNation && regionMatch;
    }
    );

    useEffect(() => {
      if (nations.length > 0) {
        const uniqueRegions = [...new Set(nations.map((nation) => nation.region))];
        setRegions(uniqueRegions);
      }
    }, [nations]);

        //using useEffect to fetch data from API
    useEffect(() => {
        console.log('Fetching data...');
        fetch('https://countries-api-abhishek.vercel.app/countries')
          .then((res) => {
            console.log('Response:', res);
            return res.json(); 
          })
          .then((result) => {
            setNations(result.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error('Error fetching data:', err);
            setLoading(false);
          });
      }, []);
  
  
    if (loading) return <p>Loading nations...</p>;


  return (
    <div className="container mt-5">
      
                <div className="container mt-5 d-flex justify-content-center">
                <form className="d-flex" role="search">
                <input
                    className="form-control search-input transition"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder=" Search country here..."
                    aria-label="Search"
                />               
                </form>
            </div>
            <div className="dropdown">
                    <select
                      className="form-select ms-2"
                      value={dropDown}
                      onChange={(e) => setDropDown(e.target.value)}
                      title="Filter by region"
                    >
                      <option value="">All Regions</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                </div>

            <ul className="list-group mt-3">
                {search && countriesList.map((nation) => (
                    <li key={nation.name} >
                        <div class="card">
                            <img src = {nation.flag} class="card-img-top" alt={`${nation.name} flag`} />
                            <h5 class="card-title">{nation.name}</h5>
                            <div class="card-body">
                                <p class="card-text"><strong>Capital:</strong> {nation.capital}</p>
                                <p class="card-text"><strong>Region:</strong> {nation.region}</p>
                                <p class="card-text"><strong>Subregion:</strong> {nation.subregion}</p>
                                <p class="card-text"><strong>Population:</strong> {nation.population}</p>
                                <p class="card-text"><strong>Area:</strong> {nation.area}</p>
                                <p class="card-text"><strong>Timezones:</strong> {nation.timezones}</p>
                                <p class="card-text"><strong>Languages:</strong> {nation.languages}</p>
                                <p class="card-text"><strong>Currency:</strong> {nation.currency}</p>
                                <p class="card-text"><strong>Border: </strong> {nation.borders && nation.borders.length > 0 ? (
                                      nation.borders.map((border, index) => (
                                          <span key={index}>
                                              {border}
                                              {index < nation.borders.length - 1 ? ", " : ""}
                                          </span>
                                      ))
                                  ) : (
                                      "N/A"
                                  )}</p>

                            </div>
                        </div>
                    </li>
                ))}
                </ul>
    </div>       
  )
}

export default CountryDetails