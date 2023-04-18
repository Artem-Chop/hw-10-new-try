import './css/styles.css';
import compiledTemplate from './templates/template.handlebars.hbs';
import API from './fetch';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
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
    refs.cardContainer.innerHTML = '';
  }
}

function renderCountries(countries) {
  refs.listContainer.innerHTML = '';
  refs.infoContainer.innerHTML = '';
  if (countries.length === 1) {
    refs.infoContainer.insertAdjacentHTML(
      'beforeend',
      renderCountryInfo(countries)
    );
  } else if (countries.length >= 10) {
    alertTooManyMatches();
  } else {
    refs.listContainer.insertAdjacentHTML(
      'beforeend',
      renderCountryList(countries)
    );
  }
}
function renderCountryList() {
  console.log('countries list here');
}
function renderCountryInfo() {
  console.log('1 country info here');
}

function alertTooManyMatches() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
