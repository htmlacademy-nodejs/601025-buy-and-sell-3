'use strict';

const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);
const {
  ExitCode,
  MAX_ID_LENGTH,
} = require(`../../constants`);
const {
  getRandomInt,
  shuffle
} = require(`../utils`);
const logger = require(`./index`).apiServiceLogger;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const DEFAULT_COUNT = 1;
const MAX_COMMENTS = 4;
const FILE_NAME = `mocks.json`;
const MAX_COUNT = 1000;

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 1,
  max: 16,
};

const getPictureFileName = (pictureNumber) => pictureNumber > 10 ? `item${pictureNumber}.jpg` : `item0${pictureNumber}.jpg`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`).filter(Boolean);
  } catch (err) {
    logger.error(err);
    return [];
  }
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = (count, titles, categories, sentences, comments) => {
  if (count > MAX_COUNT) {
    logger.info(`Не больше 1000 публикаций`);
    process.exit(ExitCode.error);
  }
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    category: [categories[getRandomInt(0, categories.length - 1)]],
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const comments = await readContent(FILE_COMMENTS_PATH);
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences, comments));
    try {
      await fs.writeFile(FILE_NAME, content);
      logger.info(`Operation success. File created.`);
    } catch (err) {
      logger.error(`Can't write data to file...`);
    }
  }
};
