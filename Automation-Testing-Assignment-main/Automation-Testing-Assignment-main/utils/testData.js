// Credentials documented on the-internet.herokuapp.com/login itself - not a secret leak.
// Kept in one place so tests never hardcode strings inline (see DECISIONS.md).
module.exports = {
  VALID_USER: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  },
  INVALID_USER: {
    username: 'invalidUser',
    password: 'wrongPassword123',
  },
};
