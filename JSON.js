// JSON
// Javascript Object Notation

//1. Object to JSON
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(['apple', 'banana']);
console.log(json); //["apple","banana"]

const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  birthDate: new Date(),
  jump: () => {
    console.log(`${name} can jump`);
  },
};

json = JSON.stringify(rabbit, ['name']);
console.log(json);

json = JSON.stringify(rabbit, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return key === 'name' ? 'ellie' : value;
});
console.log(json);

// JSON to Object
console.clear();
const obj = JSON.parse(json, (key, value) => {
  return key === 'birthDate' ? new Date() : value;
});
console.log(obj);
rabbit.jump();
// obj.jump(); // error

console.log(rabbit.birthDate.getDate()); //30
console.log(obj.birthDate.getDate()); // error
