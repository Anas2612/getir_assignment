const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./Routes/v1/records");
const { notFoundError } = require("./Utils/errorHandler");

const app = express();

/**
 * Set Security Headers
 */
app.use(helmet());

/**
 * Parse json request body
 */
app.use(express.json());

/**
 * Parse urlencoded request body
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Enable Cors
 */
app.use(cors());
app.options("*", cors());

/**
 * Load Routes
 */
app.use("/getir/v1", routes);

app.use((req, res) => {
  return res.status(httpStatus.NOT_FOUND).send(notFoundError());
});

module.exports = app;
