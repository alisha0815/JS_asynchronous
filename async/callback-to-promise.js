'use strict';

// Callback Hell example

class UserStorage {
  loginUser(id, password) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (
          (id === 'ellie' && password === 'dream') ||
          (id === 'coder' && password === 'academy')
        ) {
          resolve(id);
        } else {
          reject(new Error('not found'));
        }
      }, 2000)
    );
  }

  getRoles(user) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (user === 'ellie') {
          resolve({ name: 'ellie', role: 'admin' });
        } else {
          reject(new Error('not access'));
        }
      })
    );
  }
}

const userStorage = new UserStorage();
const id = prompt('Enter your id');
const password = prompt('Enter your password');
userStorage
  .loginUser(id, password)
  .then(userStorage.getRoles)
  .then(user => alert(`Hello, ${user.name}, you have ${user.role} role`));
