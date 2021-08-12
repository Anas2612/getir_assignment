const mockingoose = require("mockingoose");

const Record = require("../../Models/records");
const { fetchRecodsWithFilters } = require("../../Services/recordService");

const mockData = require("./mocks.json");

describe("Record Service", () => {
  it("should return records from service", async () => {
    mockingoose(Record).toReturn(mockData.mockRecords, "aggregate");

    const records = await fetchRecodsWithFilters(mockData.mockReqBody);
    expect(records).toStrictEqual(mockData.mockRecords);
  });

  it("should return error from db", async () => {
    mockingoose(Record).toReturn(
      Promise.reject(new Error("Error")),
      "aggregate"
    );
    expect(async () =>
      fetchRecodsWithFilters(mockData.mockReqBody)
    ).rejects.toThrow();
  });
});
