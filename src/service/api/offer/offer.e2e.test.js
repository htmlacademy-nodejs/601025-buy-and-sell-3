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
    const offerId = nanoid(6);
    const commentId = nanoid(6);
    const res = await request(server)
      .post(`/api/offers`)
      .send(
          {
            id: offerId,
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
                id: commentId,
                text: `Jest comment 1`
              }
            ]
          }
      );
    expect(res.statusCode).toBe(HttpCode.CREATED);
    expect(res.body).toBe(res.body);

    const createdOfferRes = await request(server).get(`/api/offers/${offerId}`);
    expect(createdOfferRes.statusCode).toBe(HttpCode.OK);
    expect(createdOfferRes.body).toHaveProperty(`id`);
    expect(createdOfferRes.body).toHaveProperty(`title`);
  });

  test(`PUT /api/offers/:offerId expected to have HttpCode 200`, async () => {
    const commentId = nanoid(6);
    const offerPayload = {
      id: mocks[0].id,
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
          id: commentId,
          text: `Jest comment 1`
        }
      ]
    };
    const res = await request(server)
      .put(`/api/offers/${mocks[0].id}`)
      .send(offerPayload);
    expect(res.statusCode).toBe(HttpCode.OK);

    const editedOfferRes = await request(server).get(`/api/offers/${mocks[0].id}`);
    expect(editedOfferRes.statusCode).toBe(HttpCode.OK);
    expect(editedOfferRes.body.comments).toContainEqual({
      id: commentId,
      text: `Jest comment 1`
    });
    expect(editedOfferRes.body).toHaveProperty(`title`);
    expect(editedOfferRes.body.title).toBe(`Jest test title`);
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
