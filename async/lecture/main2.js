'use strict';

// Geolocation promisifying
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );

// promisifying
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });
};

// consume promise
getPosition()
  .then(res => console.log(res))
  .catch(err => new Error(err));

// rendering country data where I am
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// render Country data
const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>POP ${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// render Error
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// Fetch geocoding api
const whereAmI = function () {
  getPosition()
    .then(res => {
      const { latitude: lat, longitude: lng } = res.coords;
      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=598189113573160559385x123274`
      );
    })
    .then(res => {
      console.log(res);
      // throw error, when loaded too fast
      if (!res.ok) {
        throw new Error(`Try again! We have ${res.status} error`);
      }
      return res.json();
    })
    .then(data => {
      const country = data.country;
      // get country data
      return fetch(`https://restcountries.com/v2/name/${country}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found (${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      const [data2] = data;
      return renderCountry(data2);
    })
    .catch(err => {
      console.error(`${err.message} 👿👿`);
      return renderError(`Something went wrong ${err.message}. Try again 🤬`);
    });
};

// Testing
whereAmI(52.508, 13.381);
