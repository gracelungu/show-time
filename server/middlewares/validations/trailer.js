import Joi from 'joi';
import errors from '../../helpers/errors';

/**
 * This class contains validations for Trailer
 *
 * @class Trailer
 */
class Trailer {
  /**
   * This method validates the body of request for Trailer
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Trailer
   */
  static inputValidation(req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      releaseDate: Joi.date().required(),
    });

    const { error } = Joi.validate(req.body, schema);
    if (!error) {
      return next();
    }
    return errors.joiErrorResponse(res, error);
  }
}

export default Trailer;
