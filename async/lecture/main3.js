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

// fetch url, throwing error function
const getJson = function (url, msg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${msg} ${response.status}`);
    return response.json();
  });
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
// console.log('1: I will get location');
// // const city = whereAmI();
// // console.log(city);
// // whereAmI()
// //   .then(city => console.log(`🤑2: ${city}`))
// //   .catch(err => console.err(`🤑${err.message}`))
// //   .finally(() => console.log('3: Finished getting location'));

// // IIFF
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`🤑2: ${city}`);
//   } catch (err) {
//     console.error(`🤑${err.message}`);
//   }
//   console.log('3: Finished getting location');
// })();
// console.log('3: Finished getting location');

// try...catch
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   console.error(err.message);
// }

// Running promises in parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJson(`https://restcountries.com/v2/name/${c1}`);
    // console.log(data1);
    // const [data2] = await getJson(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJson(`https://restcountries.com/v2/name/${c3}`);

    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJson(`https://restcountries.com/v2/name/${c1}`),
      getJson(`https://restcountries.com/v2/name/${c2}`),
      getJson(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('norway', 'canada', 'portugal');

// Promise race (the first wins)
(async function () {
  const res = await Promise.race([
    getJson(`https://restcountries.com/v2/name/sweden`),
    getJson(`https://restcountries.com/v2/name/ireland`),
    getJson(`https://restcountries.com/v2/name/spain`),
  ]);
  console.log(res[0]);
})();

// reject
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long'));
    }, sec * 1000);
  });
};

Promise.race([getJson(`https://restcountries.com/v2/name/korea`), timeout(0.3)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
// return an array of all the settled promises
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

// Promise.all
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021]
// the first promise but the rejected promises are ignored
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
