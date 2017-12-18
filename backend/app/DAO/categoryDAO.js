'use strict';

const _ = require('lodash');
const mongoose = require('mongoose-bird')(require('mongoose'));
const Promise = require('bluebird');

const categorySchema = new mongoose.Schema({
  category: {type: String}
}, {
  collection: 'product'
});

const CategoryModel = mongoose.model('category', categorySchema);


function query()
{
  return CategoryModel.findAsync({}, {"category": 1}).then(function (result) {
    if (result) {
      return result;
    } else {
      return null;
    }
  });
}

export default {
  query: query,

  model: CategoryModel
};
