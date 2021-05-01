const signinHandler = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Incorrect credentials');
  }
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((data) => {
      return bcrypt.compareSync(password, data[0].hash);
    })
    .then((isValid) => {
      if (isValid) {
        return db.select('*').from('users').where('email', '=', email);
      }
    })
    .then((user) => {
      if (user.length) {
        return res.json(user[0]);
      } else {
        return res.status(404).json('unable to find user');
      }
    })
    .catch((err) => {
      res.status(400).json('Wrong credentials');
    });
};

module.exports = {
  signinHandler,
};
