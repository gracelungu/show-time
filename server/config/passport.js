import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import FacebookStrategy from 'passport-facebook';
import dotenv from 'dotenv';

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy.Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/google/redirect',
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/facebook/redirect',
}, (req, accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

export default passport;
