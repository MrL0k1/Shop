'use strict';

const _ = require('lodash');
const mongoose = require('mongoose-bird')(require('mongoose'));
const Promise = require('bluebird');


const productSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  category: { type: String },
  count: { type: Number }
}, {
  collection: 'product'
});

const ProductModel = mongoose.model('product', productSchema);

function query() {
  return ProductModel.findAsync({}).then(function (result) {
    if (result) {
      return result;
    }
  });
}

function get(id) {
  return ProductModel.findOneAsync({ _id: id }).then(function (result) {
    if (result) {
      return result;
    }
  });
}

function createNew(data) {
  return Promise.resolve().then(function () {
    return new ProductModel(data).saveAsync().then(function (result) {
      if (result[0]) {
        return result[0];
      }
    });
  }).catch(function (error) {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw error;
    }

    throw error;
  });
}

function update(data) {
  return Promise.resolve().then(function () {
    if (data._id) {
      return ProductModel.findByIdAndUpdateAsync(data._id, _.omit(data, 'id'), { new: true });
    }
  }).catch(function (error) {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw error;
    }

    throw error;
  });
}

function deleteById(id) {
  return ProductModel.findOneAndRemove({ _id: id }).then(function (result) {
    if (result) {
      return result;
    }
  });
}

export default {
  query: query,
  get: get,
  createNew: createNew,
  update: update,
  deleteById: deleteById,

  model: ProductModel
};
