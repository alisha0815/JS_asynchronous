'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//get position
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });
};

// Redner error function
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// render country data
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

//async
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    // console.log(pos);
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=598189113573160559385x123274`
    );
    // error handling
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    //country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    // error handling
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    console.log(data[0]);
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 🥵`);
    renderError(`😈 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};
//testdf
console.log('1: I will get location');
// const city = whereAmI();
// console.log(city);
whereAmI()
  .then(city => console.log(`🤑2: ${city}`))
  .catch(err => console.err(`🤑${err.message}`))
  .finally(() => console.log('3: Finished getting location'));
// console.log('3: Finished getting location');

// try...catch
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   console.error(err.message);
// }
