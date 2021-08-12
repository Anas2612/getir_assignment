const { ERROR_CODES_CATEGORY, ERROR_MESSAGES } = require("../Config/constants");

/**
 * Define Errors and response structure
 * @param {*} error
 * @returns {
 *    code: string
 *    msg: string
 *    records: [{}]
 * }
 */
const validationError = (error) => ({
  code: ERROR_CODES_CATEGORY.VALIDATION_ERROR,
  msg: ERROR_MESSAGES.VALIDATION_FAILED,
  records: [],
  error,
});

const internalServerError = (error) => ({
  code: ERROR_CODES_CATEGORY.INTERNAL_SERVER_ERROR,
  msg: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  records: [],
  error,
});

const successResponse = (records = []) => ({
  code: ERROR_CODES_CATEGORY.SUCCESS,
  msg: ERROR_MESSAGES.SUCCESS,
  records,
});

module.exports = {
  validationError,
  internalServerError,
  successResponse,
};
