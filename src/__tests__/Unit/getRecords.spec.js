const request = require("supertest");

const httpStatus = require("http-status");
const app = require("../../app");
const {
  ERROR_CODES_CATEGORY,
  ERROR_MESSAGES,
} = require("../../Config/constants");
const mockData = require("./mocks.json");

const mockGetRecordsFromDB = jest.fn();

jest.mock("../../Services/recordService.js", () => ({
  fetchRecodsWithFilters: () => mockGetRecordsFromDB(),
}));

jest.mock("../../Libs/logger.js", () => ({
  log: {
    info: () => jest.fn(),
    error: () => jest.fn(),
  },
}));

describe("Get Records Unit Tests", () => {
  test("Should Throw Error for invalid Route", async () => {
    const res = await request(app)
      .post("/getir/mockRoute")
      .send(mockData.mockReqBody);
    expect(res.statusCode).toEqual(httpStatus.NOT_FOUND);
  });

  test("Should Throw Error for invalid request body", async () => {
    const res = await request(app)
      .post("/getir/v1/getRecords")
      .send(mockData.mockInvalidReqBody);
    expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(res.body.code).toBe(ERROR_CODES_CATEGORY.VALIDATION_ERROR);
    expect(res.body.error).toBe('"startDate" must be in YYYY-MM-DD format');
  });

  test("Should perform startDate and endDate validations", async () => {
    const res = await request(app)
      .post("/getir/v1/getRecords")
      .send(mockData.mockInvalidDateRangeReqBody); // here startDate is Greater than endDate
    expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(res.body.code).toBe(ERROR_CODES_CATEGORY.VALIDATION_ERROR);
    expect(res.body.error).toBe(
      '"endDate" must be greater than "ref:startDate"'
    );
  });

  test("Should check if minCount or maxCount are number", async () => {
    const res = await request(app)
      .post("/getir/v1/getRecords")
      .send(mockData.mockInvalidminCountTypeReqBody); // here startDate is Greater than endDate
    expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(res.body.code).toBe(ERROR_CODES_CATEGORY.VALIDATION_ERROR);
    expect(res.body.error).toBe('"minCount" must be a number');
  });

  test("Should perform minCount and maxCount validations", async () => {
    const res = await request(app)
      .post("/getir/v1/getRecords")
      .send(mockData.mockInvalidCountRangeReqBody); // here startDate is Greater than endDate
    expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(res.body.code).toBe(ERROR_CODES_CATEGORY.VALIDATION_ERROR);
    expect(res.body.error).toBe('"maxCount" must be greater than ref:minCount');
  });

  test("Should return the records based on filters", async () => {
    mockGetRecordsFromDB.mockResolvedValue(mockData.mockRecords);
    const res = await request(app)
      .post("/getir/v1/getRecords")
      .send(mockData.mockReqBody);

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(res.body.code).toBe(ERROR_CODES_CATEGORY.SUCCESS);
    expect(res.body.msg).toBe(ERROR_MESSAGES.SUCCESS);
    expect(res.body.records).toStrictEqual(mockData.mockRecords);
  });

  test("Should return empty records if data does not exists", async () => {
    mockGetRecordsFromDB.mockResolvedValue();
    const res = await request(app)
      .post("/getir/v1/getRecords")
      .send(mockData.mockReqBody);

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(res.body.code).toBe(ERROR_CODES_CATEGORY.SUCCESS);
    expect(res.body.msg).toBe(ERROR_MESSAGES.SUCCESS);
    expect(res.body.records).toStrictEqual([]);
  });

  test("Should Handle error from service", async () => {
    mockGetRecordsFromDB.mockRejectedValueOnce("Mongo Error!");
    const res = await request(app)
      .post("/getir/v1/getRecords")
      .send(mockData.mockReqBody);

    expect(res.statusCode).toEqual(httpStatus.INTERNAL_SERVER_ERROR);
    expect(res.body.code).toBe(ERROR_CODES_CATEGORY.INTERNAL_SERVER_ERROR);
    expect(res.body.msg).toBe(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  });
});
