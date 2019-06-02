import Joi from 'joi';
import errors from '../../helpers/errors';

/**
 * Contains validations for the user
 *
 * @class User
 */
class User {
  /**
   * Validates the signup body
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof User
   */
  static signup(req, res, next) {
    const schema = Joi.object().keys({
      username: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      return next();
    }
    return errors.joiErrorResponse(res, result.error);
  }

  /**
 * Validates the login body
 *
 * @static
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * @memberof User
 */
  static login(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      return next();
    }
    return errors.joiErrorResponse(res, result.error);
  }

  /**
 * Validates the update body
 *
 * @static
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * @memberof User
 */
  static update(req, res, next) {
    const schema = Joi.object().keys({
      username: Joi.string().min(3).max(20),
      picture: Joi.string(),
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      return next();
    }
    return errors.joiErrorResponse(res, result.error);
  }
}

export default User;
