import jwt from 'jsonwebtoken';
import users from '../../models/users';
import errors from '../../helpers/errors';

/**
 * Validates the user
 * authentification
 *
 * @class Auth
 */
class Auth {
  /**
   * Checks if the token
   * contains an authorized user
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Auth
   */
  static async check(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).json({
        status: 400,
        message: 'The authorization token is missing',
      });
    }

    const token = authorization.split(' ')[1];

    try {
      const { email } = await jwt.verify(token, process.env.SECRET);

      const user = await users.findOne({ email });

      if (user) {
        req.user = user;
        return next();
      }

      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    } catch (e) {
      errors.errorResponse(res, e);
    }

    return true;
  }
}

export default Auth;
