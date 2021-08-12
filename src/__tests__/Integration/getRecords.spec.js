require("dotenv").config();
const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../app");
const {
  ERROR_CODES_CATEGORY,
  ERROR_MESSAGES,
} = require("../../Config/constants");

const {
  mongoose: { url, options },
} = require("../../Config");

const mongoose = require("../../Libs/mongoose");

describe("Get Records Unit Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(url, options);
  });

  test("Should return the records based on filters", async () => {
    const res = await request(app).post("/getir/v1/getRecords").send({
      startDate: "2021-01-21",
      endDate: "2021-04-21",
      minCount: 4000,
      maxCount: 5000,
    });

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(res.body.code).toBe(ERROR_CODES_CATEGORY.SUCCESS);
    expect(res.body.msg).toBe(ERROR_MESSAGES.SUCCESS);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
