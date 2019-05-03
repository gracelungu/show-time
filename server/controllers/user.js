import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import errors from '../helpers/errors';
import users from '../models/users';

dotenv.config();

/**
 * Contains user controllers
 *
 * @class User
 */
class User {
  static async signup(req, res) {
    const { username, email, password } = req.body;

    try {
      const token = jwt.sign({ email, username }, process.env.SECRET, { expiresIn: '24h' });
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const result = await users.create({
        username,
        password: hashed,
        email: email.toString().toLowerCase(),
      });
      result.password = undefined;

      return res.status(201).json({ status: 201, user: result, token });
    } catch (e) {
      errors.errorResponse(res, e);
    }
    return true;
  }
}

export default User;
