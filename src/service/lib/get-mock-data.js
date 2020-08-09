'use strict';

const fs = require(`fs`).promises;
const FILENAME_PATH = `./mocks.json`;

let data = [];

exports.getMockData = async () => {
  if (data.length) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILENAME_PATH);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.error(err);
  }

  return data;
};
