import express from 'express';
import user from '../controllers/user';
import validations from '../middlewares/validations/user';

const router = express.Router();

router.route('/signup')
  .post(validations.signup, user.signup);

export default router;
