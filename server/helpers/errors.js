/**
 * Handles controller errors
 *
 * @class errors
 */
class errors {
  /**
   *
   *
   * @static
   * @param {*} res
   * @param {*} e
   * @returns {object} error
   * @memberof errors
   */
  static errorResponse(res, e) {
    if (e.code === 11000) {
      return res.status(400).json({
        status: 400,
        message: 'A user with the same email or username already exist',
      });
    }

    return res.status(500).json({
      status: 500,
      message: e.message,
    });
  }

  /**
*
*
* @static
* @param {*} res
* @param {*} e
* @returns {object} error
* @memberof errors
*/
  static joiErrorResponse(res, e) {
    return res.status(400).json({
      status: 400,
      message: e.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
}

export default errors;
