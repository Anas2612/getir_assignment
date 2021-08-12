const logger = require("../Libs/logger");
const Records = require("../Models/records");

/**
 *
 * @param {*} param0
 * @returns records from db [{}]
 */
exports.fetchRecodsWithFilters = async ({
  startDate,
  endDate,
  minCount,
  maxCount,
}) => {
  try {
    return await Records.aggregate([
      {
        $project: {
          key: 1,
          createdAt: 1,
          totalCount: { $sum: "$counts" },
          _id: 0,
        },
      },
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          totalCount: { $gt: minCount, $lt: maxCount },
        },
      },
    ]);
  } catch (err) {
    logger.log.error(`Error Occurred while fetching records! ,${err}`);
    throw err;
  }
};
