const passport = require('passport');
const passportJwt = require('passport-jwt');
const { jwtSecret, jwtSession } = require('./config/config.json').jwt;
const { User } = require('./models');
const { ExtractJwt, Strategy } = passportJwt;

const params = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = () => {
  const strategy = new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);

      if (!user) {
        return done(new Error('Nie ma takiego użytkownika.'));
      }

      return done(null, { id: user.id });
    } catch (error) {
      console.error('Authentication error:', error);
      return done(error, null);
    }
  });
  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', jwtSession)
  };
};
