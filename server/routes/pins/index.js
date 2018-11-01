const router = require('express').Router()
const {
  ObjectId
} = require('mongoose').Types
const {
  ensureLoggedIn
} = require('connect-ensure-login')
const Pins = require('./pins.db')

router.get('/pins', (req, res) => {
  let results = []
  Pins.find()
    .then(pins => {
      if (req.user) {
        pins.forEach((v) => {
          results.push({
            id: v._id,
            title: v.title,
            url: v.url
          })
        })
      } else {
        pins.forEach((v) => {
          results.push({
            title: v.title,
            url: v.url
          })
        })
      }
      res.json(JSON.stringify(results))
    })
    .catch(ex => {
      res.status(500).end()
    })
})

router.post('/pins', ensureLoggedIn(), (req, res) => {
  let results = []
  Pins.find({
      uid: req.user._id
    })
    .then(pins => {
      pins.forEach((v, i) => {
        results.push({
          id: v._id,
          title: v.title,
          url: v.url,
          date: v.date
        })
      })
      res.json(JSON.stringify(results))
    })
    .catch(ex => {
      res.status(500).end()
    })
})

router.put('/pins', ensureLoggedIn(), (req, res) => {
  const date = new Date().toUTCString()
  const uid = req.user._id
  const title = req.body.title
  const url = req.body.url
  if (!uid || !title || !url) {
    return res.status(400).end()
  }
  let data = {
    uid,
    title,
    url,
    date
  }
  Pins.create(data)
    .then(pin => {
      res.status(201).json(JSON.stringify([{
        title: pin.title,
        url: pin.url
      }]))
    })
    .catch(ex => {
      res.status(500).end()
    })
})

router.delete('/pins/:id', ensureLoggedIn(), (req, res) => {
  let id = ''
  try {
    id = ObjectId(req.params.id)
  } catch (ex) {
    return res.status(400).end()
  }
  Pins.findOneAndDelete({
      _id: id,
      uid: req.user._id
    })
    .then(pin => {
      if (!pin) {
        return res.status(400).end()
      }
      res.status(204).end()
    })
    .catch(ex => {
      res.status(500).end()
    })
})

module.exports = router
