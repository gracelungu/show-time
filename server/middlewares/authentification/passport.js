import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../../models/users';

// Setup the local strategy
const LocalStrategy = Strategy;
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email, password });
        return done(false, user, { message: 'Logged In Successfully' });
      } catch (e) {
        return done(true, null, { message: 'Incorect email or password' });
      }
    },
  ),
);
