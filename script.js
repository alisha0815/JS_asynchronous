'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Get Country Neighbor
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
  // countriesContainer.style.opacity = 1;
};

// Redner error function
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

// Promise
const getCountryNeighbor = function (country, className = '') {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log(response);

      // if (!response.ok) {
      //   throw new Error(`Country not found ${response.status}`);
      // }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // const neighbor = data[0].borders[0];
      const neighbor = 'dfdfdfdf';
      return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found ${response.status}`);
      }
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 😡😡😡`);
      renderError(`Something went wrong 😡😡😡 ${err.message}. Try again! 🤗`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', () => getCountryNeighbor('norway'));
getCountryNeighbor('koreaaa');

// const getCountryNeighbor = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Redner country 1
//     renderCountry(data);
//     console.log(data.languages[0].name);
//     //     console.log(data);
//     //     console.log(data.borders[0]);

//     // Get neighbor country
//     const [neighbor] = data.borders; // FIN
//     console.log(neighbor);
//     if (!neighbor) return;

//     // AJAX call neighbor country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const neighborData = JSON.parse(this.responseText);
//       console.log(neighborData);

//       // render country
//       renderCountry(neighborData, 'neighbour');
//     });
//   });
// };

// getCountryNeighbor('norway');
// getCountryNeighbor('korea');

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `<article class="country">
//       <img class="country__img" src="${data.flag}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>POP ${(
//           +data.population / 1000000
//         ).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//       </div>
//     </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('norway');
// getCountryData('sweden');
