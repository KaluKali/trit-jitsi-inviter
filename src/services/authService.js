const tritJWT = require('trit-jwt-generator');

export const logIn = (username, room) => (
  new Promise((resolve) => { // resolve,reject
    const serverParams = {
      sub: 'bbb.trit.biz',
      room,
      aud: 'bbb.trit.biz',
      iss: 'bbb.trit.biz',
    };
    const date = new Date();
    date.setHours(date.getHours() + 2);
    resolve({
      teacher: tritJWT.generateJWT(serverParams, 'test', date, {
        user: {
          name: username,
        }
      }),
      student: tritJWT.generateJWT(serverParams, 'test', date, {
        user: {
          name: '',
        }
      })
    });
    // if (username !== '' && room !== '') {
    // } else {
    //   reject(new Error('Incorrect username or room.'));
    // }
  })
);
