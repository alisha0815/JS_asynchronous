'use strict';

// Build Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening!');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You will win 😍');
    } else {
      reject('You lost 🤐');
    }
  }, 2000);
});

// Conusme promise
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//2. wait promisifying
const wait = function (seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

// consume promise
wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 3 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 4 seconds'));

// Create fulfilled or rejected promise immediately
Promise.resolve('You win 😁').then(res => console.log(res));
/// reject
Promise.reject(new Error('You lost 😫')).catch(err => console.error(err));
