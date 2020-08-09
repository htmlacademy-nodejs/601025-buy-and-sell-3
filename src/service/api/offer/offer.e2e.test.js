'use strict';

const request = require(`supertest`);
const server = require(`../../../express`);
const {nanoid} = require(`nanoid`);

const {HttpCode} = require(`../../../constants`);
const {getMockData} = require(`../../../service/lib/get-mock-data`);

let mocks = [];

describe(`Тестирование API по маршруту Offers`, () => {
  beforeAll(async () => {
    mocks = await getMockData();
  });

  test(`Get /api/offers expected to have HttpCode 200`, async () => {
    const res = await request(server).get(`/api/offers`);

    expect(res.statusCode).toBe(HttpCode.OK);


    res.body.forEach((item) => {
      expect(item).toHaveProperty(`id`);
      expect(item).toHaveProperty(`title`);
    });
  });

  test(`Get /api/offers expected to have HttpCode 404`, async () => {
    const res = await request(server).get(`/api/affirs`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`GET /api/offers/:offerId expected to have HttpCode 200`, async () => {
    const res = await request(server).get(`/api/offers/${mocks[0].id}`);

    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toHaveProperty(`id`);
    expect(res.body).toHaveProperty(`title`);
  });

  test(`GET /api/offers/:offerId expected to have HttpCode 404`, async () => {
    const res = await request(server).get(`/api/offers/ggbTffRScb`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`POST /api/offers`, async () => {
    const res = await request(server)
      .post(`/api/offers`)
      .send(
          {
            id: nanoid(6),
            category: [
              `Посуда`
            ],
            description: `Jest test description`,
            picture: `item08.jpg`,
            title: `Jest test title`,
            type: `offer`,
            sum: 12225,
            comments: [
              {
                id: nanoid(6),
                text: `Jest comment 1`
              }
            ]
          }
      );
    expect(res.statusCode).toBe(HttpCode.CREATED);
    expect(res.body).toBe(res.body);
  });

  test(`PUT /api/offers/:offerId expected to have HttpCode 200`, async () => {
    const res = await request(server)
      .put(`/api/offers/${mocks[0].id}`)
      .send(
          {
            id: nanoid(6),
            category: [
              `Посуда`
            ],
            description: `Jest test description`,
            picture: `item08.jpg`,
            title: `Jest test title`,
            type: `offer`,
            sum: 12225,
            comments: [
              {
                id: nanoid(6),
                text: `Jest comment 1`
              }
            ]
          }
      );
    expect(res.statusCode).toBe(HttpCode.OK);

  });

  test(`PUT /api/offers/:offerId expected to have HttpCode 404`, async () => {
    const res = await request(server)
      .put(`/api/offers/DgDbnwnsj`)
      .send({title: `Jest test`});
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`DELETE /api/offers/:offerId expected to have HttpCode 200`, async () => {
    const res = await request(server).delete(`/api/offers/${mocks[3].id}`);
    expect(res.statusCode).toBe(HttpCode.OK);

  });

  test(`DELETE /api/offers/:offerId expected to have HttpCode 404`, async () => {
    const res = await request(server).delete(`/api/offers/GGffDDEE;;kkdn`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`GET /api/offers/:offerId/comments expected to have HttpCode 200`, async () => {
    const res = await request(server).get(`/api/offers/${mocks[1].id}/comments`);
    expect(res.statusCode).toBe(HttpCode.OK);

    res.body.forEach((item) => {
      expect(item).toHaveProperty(`id`);
      expect(item).toHaveProperty(`text`);
    });
  });

  test(`GET /api/offers/:offerId/comments expected to have HttpCode 404`, async () => {
    const res = await request(server).get(`/api/offers/vffeveveYYffccnn/comments`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`DELETE /api/offers/:offerId/comments/:commentId expected to have 200`, async () => {
    const res = await request(server).delete(`/api/offers/${mocks[2].id}/comments/${mocks[2].comments[0].id}`);
    expect(res.statusCode).toBe(HttpCode.OK);

  });

  test(`DELETE /api/offers/:offerId/comments/:commentId expected to have HttpCode 404`, async () => {
    const res = await request(server).delete(`/api/offers/${mocks.id}/comments/${mocks[2].id}`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);

  });

  test(`POST /api/offers/:offerId/comments expected to have HttpCode 201`, async () => {
    const res = await request(server)
      .post(`/api/offers/${mocks[4].id}/comments`)
      .send({id: nanoid(6), text: `Jest test post comment`});
    expect(res.statusCode).toBe(HttpCode.CREATED);
  });

  test(`POST /api/offers/:offerId/comments expected to have HttpCode 404`, async () => {
    const res = await request(server)
      .post(`/api/offers/${mocks[4].id}/CAMENTSss`)
      .send({id: nanoid(6), text: `Jest test post comment`});
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

});
