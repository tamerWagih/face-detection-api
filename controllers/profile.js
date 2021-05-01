const handleProfileGet = (db) => (req, res) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then((user) => {
      if (user.length) return res.json(user[0]);
      else return res.status(404).json('Not Found!');
    })
    .catch((err) => {
      res.status(404).json('error getting user');
    });
};

module.exports = {
  handleProfileGet,
};
