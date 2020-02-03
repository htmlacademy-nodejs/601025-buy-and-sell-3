'use strict';
const fs = require(`fs`).promises;
const chalk = require("chalk");
const {
  ExitCode
} = require('../../constants');
const {
  getRandomInt,
  shuffle
} = require('../utils');

const FILE_SENTENCES_PATH = `./src/data/sentences.txt`;
const FILE_TITLES_PATH = `./src/data/titles.txt`;
const FILE_CATEGORIES_PATH = `./src/data/categories.txt`;

const DEFAULT_COUNT = 1;
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
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, categories, sentences) => {
  if (count > MAX_COUNT) {
    console.info(chalk.red('Не больше 1000 публикаций'));
    process.exit(ExitCode.error);
  }
  return  Array(count).fill({}).map(() => ({
    category: [categories[getRandomInt(0, categories.length - 1)]],
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
  }))
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`))
    } catch(err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
