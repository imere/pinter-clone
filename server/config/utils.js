module.exports = {
  validateUsername(value) {
    return /^[a-zA-Z]{5,10}$/.test(value);
  },
  validatePassword(value) {
    return /^[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\\\|\;\:\'\"\,\<\.\>\/\?]{5,16}$/.test(
      value
    );
  },
};
