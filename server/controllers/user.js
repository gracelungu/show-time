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
  /**
   * Checks whether the user exists,
   * if not, a new one is created,
   * else the same user is returned
   *
   * @static
   * @param {*} res
   * @param {*} user
   * @returns {object} user
   * @memberof User
   */
  static async findOrCreate(res, user) {
    try {
      const {
        id, email, picture, displayName,
      } = user;

      const username = displayName.replace(/\s+/g, '') + id.substr(0, 5);
      const token = jwt.sign({ email, username }, process.env.SECRET, { expiresIn: '24h' });

      const exist = await users.findOne({ email });

      if (exist == null) {
        const result = await users.create({
          username,
          email,
          picture,
        });
        return res.status(200).json({
          status: 200,
          user: result,
          token,
        });
      }

      return res.status(200).json({
        status: 200,
        user: exist,
        token,
      });
    } catch (e) {
      errors.errorResponse(res, e);
    }
    return true;
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof User
   */
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

  static async socialAuth(req, res) {
    await User.findOrCreate(res, req.user);
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await users.findOne({ email });

      if (user) {
        const match = await bcrypt.compare(password, user.password);
        user.password = undefined;

        const { username } = user;
        const token = jwt.sign({ email, username }, process.env.SECRET, { expiresIn: '24h' });

        if (match) {
          return res.status(200).json({
            status: 200,
            user,
            token,
          });
        }

        return res.status(401).json({
          status: 401,
          message: 'Wrong password',
        });
      }

      return res.status(404).json({
        status: 404,
        message: 'User not found for the given email',
      });
    } catch (e) {
      errors.errorResponse(res, e);
    }
    return true;
  }
}

export default User;
