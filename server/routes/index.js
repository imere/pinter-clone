module.exports = (app) => {
  app.use(require('./users'))
  app.use(require('./pins'))
}
