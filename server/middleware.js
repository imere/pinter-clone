const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');
const { compareSync } = require('bcrypt');

const Users = require('./routes/users/users.db');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = app => {
  app.use(require('compression')());
  app.use(
    helmet({
      hidePoweredBy: {
        setTo: 'nginx',
      },
    })
  );

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.secret || 'secret',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        url: process.env.suri || require(require('path').join(__dirname, './config/config')).FALLBACK_SURI,
        ttl: 60 * 60 * 6,
      }),
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY || 'holder',
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'holder',
        callbackURL: 'https://your.domain/auth/twitter/callback',
      },
      function (token, tokenSecret, profile, cb) {
        const twitterid = '0' + profile.id;
        Users.findOneAndUpdate(
          {
            twitterid,
          },
          {
            lastlogin: new Date().toUTCString(),
          }
        )
          .then(user => {
            if (!user) {
              Users.create({
                twitterid,
                password: '.password',
                lastlogin: new Date().toUTCString(),
              })
                .then(() => {
                  return cb(null, twitterid);
                })
                .catch(ex => {
                  return cb(ex);
                });
            }
          })
          .catch(ex => {
            return cb(ex);
          });
      }
    )
  );

  passport.use(
    new LocalStrategy(function (username, password, done) {
      Users.findOne({
        username,
      })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: 'Incorrect',
            });
          }
          if (!compareSync(password, user.password)) {
            return done(null, false, {
              message: 'Incorrect',
            });
          }
          return done(null, user);
        })
        .catch(ex => {
          return done(ex);
        });
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter'), function (
    req,
    res
  ) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
};
