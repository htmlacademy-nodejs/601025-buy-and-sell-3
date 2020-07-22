'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll(searchText) {
    const normalizedSearchText = decodeURI(searchText).toLowerCase();
    return this._offers.
    filter((offer) => offer.title.toLowerCase().includes(normalizedSearchText));
  }
}

module.exports = SearchService;
