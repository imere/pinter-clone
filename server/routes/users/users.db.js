const UserSchema = {
  username: {
    type: String,
    unique: true,
    validate: {
      validator(value) {
        return /^[a-zA-Z]{5,10}$/.test(value)
      }
    }
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
  }
}

module.exports = require('mongoose').model('users', UserSchema)
