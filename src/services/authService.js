const axios = require('axios').default;

export const logIn = (username, room) => (
  new Promise((resolve, reject) => {
    const tokens = {
      teacher: Math.random().toString(36).slice(2),
      student: Math.random().toString(36).slice(2)
    };
    const data = new Date();
    data.setHours(data.getHours() + 2);
    axios.post('http://127.0.0.1:3000/token',
      {
        content: {
          Teacher: tokens.teacher,
          Student: tokens.student,
          Alive: data,
          Moderator: username,
          Room: room
        },
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      }).catch(err => {
      console.error(err);
      reject(err);
    });
    resolve(tokens);
  })
);
