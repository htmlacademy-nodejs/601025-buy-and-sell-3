'use strict';

const request = require(`supertest`);
const server = require(`../../../express`);

const {HttpCode} = require(`../../../constants`);
const {getMockData} = require(`../../../service/lib/get-mock-data`);

let mocks = [];

describe(`Тестирование API по маршруту Search`, () => {
  beforeAll(async () => {
    mocks = await getMockData();
  });

  test(`When get Search with valid query status code should be 200`, async () => {
    const uri = encodeURI(`/api/search?query=${mocks[0].title.split(` `)[0]}`);
    const res = await request(server).get(uri);
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`When get Search with invalid query status code should be 404`, async () => {
    const res = await request(server).get(`/api/search?query=jestTest`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });
});
