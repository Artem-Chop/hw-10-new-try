const BASE_URL = 'https://restcountries.com/v3.1/name/';
// const fields = 'fields=name,capital,population,flags,languages';

function fetchCountryByName(countryName) {
  return fetch(`${BASE_URL}${countryName}`).then(response => {
    return response.json();
  });
}

export default { fetchCountryByName };
