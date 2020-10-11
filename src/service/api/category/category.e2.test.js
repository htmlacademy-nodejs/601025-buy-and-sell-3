'use strict';

const request = require(`supertest`);
const server = require(`../../../express`);

const {HttpCode} = require(`../../../constants`);
const {getMockData} = require(`../../../service/lib/get-mock-data`);

let mocks = [];

describe(`Тестирование API по маршруту categories`, () => {
  beforeAll(async () => {
    mocks = await getMockData();
  });

  test(`When get categories status code should be 200`, async () => {
    const res = await request(server).get(`/api/category`);
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`When get categories should be expected array`, async () => {
    const expected = Array.from(new Set(mocks.reduce((acc, item) => [...acc, ...item.category], [])));
    const res = await request(server).get(`/api/category`);
    expect(res.body).toEqual(expect.arrayContaining(expected));
  });
});
