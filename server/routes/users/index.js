const router = require('express').Router();
const passport = require('passport');
const { hashSync } = require('bcrypt');
const { validateUsername, validatePassword } = require('../../config/utils');

const Users = require('./users.db');

router.post('/create', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (
    !username ||
    !password ||
    !validateUsername(username) ||
    !validatePassword(password)
  ) {
    return res.status(400).end();
  }
  Users.create({
    username,
    password: hashSync(password, 13),
    lastlogin: new Date().toUTCString(),
  })
    .then(user => {
      res.status(201).end();
    })
    .catch(ex => {
      if (ex.message && ex.message.indexOf('duplicate') >= 0) {
        return res.status(400).end('user exists');
      }
      res.status(500).end();
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  Users.findByIdAndUpdate(req.user._id, {
    lastlogin: new Date().toUTCString(),
  })
    .then(user => {
      res.json(
        JSON.stringify({
          status: 'success',
        })
      );
    })
    .catch(ex => {
      res.status(500).end();
    });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
