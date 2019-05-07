import express from 'express';
import passport from '../config/passport';
import user from '../controllers/user';
import validations from '../middlewares/validations/user';

const router = express.Router();

router.route('/signup')
  .post(validations.signup, user.signup);

router.route('/google')
  .get(passport.authenticate(
    'google',
    {
      scope:
        ['email',
          'profile'],
    },
  ));

router.route('/google/redirect').get(passport.authenticate('google'), user.socialAuth);

export default router;
