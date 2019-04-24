const { validateUsername } = require('../../config/utils');

const UserSchema = {
  username: {
    type: String,
    unique: true,
    validate: {
      validator: validateUsername,
    },
  },
  twitterid: {
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  lastlogin: {
    required: true,
    type: Date,
  },
};

module.exports = require('mongoose').model('users', UserSchema);
