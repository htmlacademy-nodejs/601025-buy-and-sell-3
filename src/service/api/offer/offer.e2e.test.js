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
    expect(res.body).toMatchObject(mocks);

  });

  test(`Get /api/offers expected to have HttpCode 404`, async () => {
    const res = await request(server).get(`/api/affirs`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`GET /api/offers/:offerId expected to have HttpCode 200`, async () => {
    const OFFER_INDEX = 0;
    const res = await request(server).get(`/api/offers/${mocks[OFFER_INDEX].id}`);

    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toMatchObject(mocks[OFFER_INDEX]);
  });

  test(`GET /api/offers/:offerId expected to have HttpCode 404`, async () => {
    const res = await request(server).get(`/api/offers/ggbTffRScb`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`POST /api/offers`, async () => {
    const offerId = nanoid(6);
    const commentId = nanoid(6);
    const newOffer = {
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
    };

    const res = await request(server)
      .post(`/api/offers`)
      .send(newOffer);
    expect(res.statusCode).toBe(HttpCode.CREATED);
    expect(res.body).toBe(res.body);

    const createdOfferRes = await request(server).get(`/api/offers/${offerId}`);
    expect(createdOfferRes.statusCode).toBe(HttpCode.OK);
    expect(res.body).toMatchObject(newOffer);
  });

  test(`PUT /api/offers/:offerId expected to have HttpCode 200`, async () => {
    const OFFER_INDEX = 0;
    const commentId = nanoid(6);
    const offerPayload = {
      id: mocks[OFFER_INDEX].id,
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
      .put(`/api/offers/${mocks[OFFER_INDEX].id}`)
      .send(offerPayload);
    expect(res.statusCode).toBe(HttpCode.OK);

    const editedOfferRes = await request(server).get(`/api/offers/${mocks[OFFER_INDEX].id}`);
    expect(editedOfferRes.statusCode).toBe(HttpCode.OK);
    expect(editedOfferRes.body).toMatchObject(offerPayload);
  });

  test(`PUT /api/offers/:offerId expected to have HttpCode 404`, async () => {
    const res = await request(server)
      .put(`/api/offers/DgDbnwnsj`)
      .send({title: `Jest test`});
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`DELETE /api/offers/:offerId expected to have HttpCode 200`, async () => {
    const OFFER_INDEX = 3;
    const res = await request(server).delete(`/api/offers/${mocks[OFFER_INDEX].id}`);
    expect(res.statusCode).toBe(HttpCode.OK);

    const deletedOfferRes = await request(server).get(`/api/offers/${mocks[OFFER_INDEX].id}`);
    expect(deletedOfferRes.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`DELETE /api/offers/:offerId expected to have HttpCode 404`, async () => {
    const res = await request(server).delete(`/api/offers/GGffDDEE;;kkdn`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`GET /api/offers/:offerId/comments expected to have HttpCode 200`, async () => {
    const OFFER_INDEX = 1;
    const res = await request(server).get(`/api/offers/${mocks[OFFER_INDEX].id}/comments`);
    expect(res.statusCode).toBe(HttpCode.OK);

    expect(res.body).toMatchObject(mocks[OFFER_INDEX].comments);
  });

  test(`GET /api/offers/:offerId/comments expected to have HttpCode 404`, async () => {
    const res = await request(server).get(`/api/offers/vffeveveYYffccnn/comments`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`DELETE /api/offers/:offerId/comments/:commentId expected to have 200, comment expected to be removed`, async () => {
    const OFFER_INDEX = 2;
    const COMMENT_INDEX = 0;
    const res = await request(server).delete(`/api/offers/${mocks[OFFER_INDEX].id}/comments/${mocks[OFFER_INDEX].comments[COMMENT_INDEX].id}`);
    expect(res.statusCode).toBe(HttpCode.OK);

    const updatedCommentsRes = await request(server).get(`/api/offers/${mocks[OFFER_INDEX].id}/comments/${mocks[OFFER_INDEX].comments[COMMENT_INDEX].id}`);
    expect(updatedCommentsRes.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`DELETE /api/offers/:offerId/comments/:commentId expected to have HttpCode 404`, async () => {
    const res = await request(server).delete(`/api/offers/${mocks[2].id}/comments/sdghfdhtyrj`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`POST /api/offers/:offerId/comments expected to have HttpCode 201`, async () => {
    const OFFER_INDEX = 4;
    const newComment = `Jest test post comment`;
    const res = await request(server)
      .post(`/api/offers/${mocks[OFFER_INDEX].id}/comments`)
      .send({text: newComment});
    expect(res.statusCode).toBe(HttpCode.CREATED);
    const newCommentId = res.body.id;
    const newCommentsRes = await request(server).get(`/api/offers/${mocks[OFFER_INDEX].id}/comments`);
    expect(newCommentsRes.body).toContainEqual({id: newCommentId, text: newComment});

  });

  test(`POST /api/offers/:offerId/comments expected to have HttpCode 404`, async () => {
    const res = await request(server)
      .post(`/api/offers/${mocks[4].id}/CAMENTSss`)
      .send({id: nanoid(6), text: `Jest test post comment`});
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

});
