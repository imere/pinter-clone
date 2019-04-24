const PinSchema = {
  uid: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
    validate: {
      validator(value) {
        return /^.{1,40}$/.test(value);
      },
    },
  },
  url: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
};

module.exports = require('mongoose').model('pins', PinSchema);
