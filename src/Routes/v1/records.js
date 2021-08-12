const express = require("express");

const validate = require("../../Middlewares/validate");
const { getRecordsSchema } = require("../../RequestSchemas");
const { getRecords } = require("../../Controllers/v1/records");

const router = express.Router();

/**
 * Routes Initialisation
 */
router.post("/getRecords", validate(getRecordsSchema), getRecords);

module.exports = router;
