const httpStatus = require("http-status");
const logger = require("../../Libs/logger");

const {
  internalServerError,
  successResponse,
} = require("../../Utils/errorHandler");
const { fetchRecodsWithFilters } = require("../../Services/recordService");

/**
 * Fetch Records based on filter
 * @param {*} req
 * @param {*} res
 * @returns {
 *      code : String
 *      msg : String
 *      records : Array
 * }
 */
exports.getRecords = async (req, res) => {
  try {
    const recordsData = await fetchRecodsWithFilters(req.body);
    return res.status(httpStatus.OK).send(successResponse(recordsData));
  } catch (err) {
    logger.log.error(`Internal Server Error ${err}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(internalServerError(err));
  }
};
