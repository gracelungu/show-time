import errors from '../helpers/errors';
import Trailers from '../models/trailer';

/**
 * This class contains Trailer controllers
 *
 * @class Trailer
 */

class Trailer {
  /**
   * this method select all the trailers
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} list of trailers
   * @memberof Trailer
   */
  static async getTrailer(req, res) {
    try {
      const data = await Trailers.find();
      return res.status(200).json({
        result: data,
        status: 200,
      });
    } catch (err) {
      errors.errorResponse(res, err);
    }
    return true;
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} trailer added
   * @memberof Trailer
   */
  static async addTrailer(req, res) {
    try {
      const { title, description, releaseDate } = req.body;

      // checking if all the images are inserted
      if (Object.keys(req.files).length <= 1) {
        return res.status(400).json({
          error: 'images are required',
          status: 400,
        });
      }
      const data = await Trailers.create({
        title,
        description,
        releaseDate,
        landScape: req.files.landscape[0].path,
        portrait: req.files.portrait[0].path,
      });
      return res.status(200).json({
        result: data,
        status: 200,
      });
    } catch (err) {
      errors.errorResponse(res, err);
    }
    return true;
  }
}

export default Trailer;
