module.exports = app => {
  app.use('/v1', require('./users'));
  app.use('/v1', require('./pins'));
};
