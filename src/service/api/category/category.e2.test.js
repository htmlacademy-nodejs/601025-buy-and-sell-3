'use strict';

const request = require(`supertest`);
const server = require(`../../../express`);

const {HttpCode} = require(`../../../constants`);
const {getMockData} = require(`../../../service/lib/get-mock-data`);

describe(`Тестирование API по маршруту categories`, () => {
  beforeAll(async () => {
    await getMockData();
  });

  test(`When get categories status code should be 200`, async () => {
    const res = await request(server).get(`/api/category`);
    expect(res.statusCode).toBe(HttpCode.OK);
  });

});
