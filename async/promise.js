// Promise is a js object for asynchronous operation
// State : pending --> fulfilled  or rejected
// Producer vs Consumer

// 1. Producer
// When new promise is created, the executor runs atutomatically

const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files)
  console.log('doing something...');
  setTimeout(() => {
    // resolve('ellie');
    reject(new Error('no network'));
  }, 2000);
});

// 2. Consumer
promise
  .then(value => console.log(value))
  .catch(error => console.log(error))
  .finally(() => console.log('finally')); // ellie

// 3. Promise chanining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then(num => num * 2)
  .then(num => num * 3)
  .then(num => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then(num => console.log(num));

// 4. Error handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🍗'), 1000);
  });

const getEgg = hen =>
  new Promise((resolve, reject) => {
    // setTimeout(() => resolve(`${hen} => 🥗`), 1000);
    setTimeout(() => reject(new Error(`error! ${hen} => 🥗`)), 1000);
  });

const cook = egg =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍚`), 1000);
  });

// getHen()
//   .then(hen => getEgg(hen))
//   .then(egg => cook(egg))
//   .then(meal => console.log(meal));
getHen() //
  .then(getEgg)
  .catch(error => {
    return '🍔';
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);
