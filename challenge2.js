const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => reject(new Error('Images not found')));
  });
};

// wait function
const wait = function (seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

// Consume promise

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('image 1 loaded');
    return wait(2);
  })
  // hide img1
  .then(() => {
    currentImg.style.display = 'none';
    // load img2
    return createImage('img/img-2.jpg');
  })
  // hide img2
  .then(img => {
    currentImg = img;
    console.log('image 2 loaded');
    return wait(2); //load img3
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
