const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

/**
 * Define Request Schema
 */
const getRecordsSchema = {
  body: Joi.object().keys({
    startDate: Joi.date().format("YYYY-MM-DD").required(),
    endDate: Joi.date().format("YYYY-MM-DD").required(),
    minCount: Joi.number().min(0).required(),
    maxCount: Joi.number().min(0).required(),
  }),
};

module.exports = {
  getRecordsSchema,
};
