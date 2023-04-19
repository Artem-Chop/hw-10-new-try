import './css/styles.css';
import ListMarkup from './templates/ListMarkup.hbs';
import InfoCard from './templates/InfoCard.hbs';
import API from './fetch';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 500;
const refs = {
  listContainer: document.querySelector('.country-list'),
  infoContainer: document.querySelector('.country-info'),
  searchInput: document.querySelector('#search-box'),
};

refs.searchInput.addEventListener('input', debounce(OnTipe, DEBOUNCE_DELAY));

function OnTipe() {
  const input = refs.searchInput.value.trim();
  if (input !== '') {
    API.fetchCountryByName(input).then(renderCountries).catch(alertWrongName);
  } else {
    refs.infoContainer.innerHTML = '';
    refs.listContainer.innerHTML = '';
  }
}

function renderCountries(countries) {
  refs.listContainer.innerHTML = '';
  refs.infoContainer.innerHTML = '';
  if (countries.length === 1) {
    renderCountryInfo(countries[0]);
  } else if (countries.length >= 10) {
    alertTooManyMatches();
  } else if (countries.status === 404) {
    alertWrongName();
  } else {
    renderCountryList(countries);
  }
}
function renderCountryList(countryList) {
  const mapList = countryList.map(country => ListMarkup(country)).join('');
  refs.listContainer.innerHTML = mapList;
}
function renderCountryInfo(country) {
  country.languages = Object.values(country.languages).join(', ');
  const infoMarkup = InfoCard(country);
  refs.infoContainer.innerHTML = infoMarkup;
}

function alertTooManyMatches() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
