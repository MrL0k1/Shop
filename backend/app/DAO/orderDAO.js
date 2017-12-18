'use strict';

const _ = require('lodash');
const mongoose = require('mongoose-bird')(require('mongoose'));
const Promise = require('bluebird');

const orderSchema = new mongoose.Schema({
  name: {type: String},
  address: {type: String},
  products: {type: Array},
  realized: {type: Boolean}
}, {
  collection: 'order'
});

const OrderModel = mongoose.model('order', orderSchema);


function query()
{
  return OrderModel.findAsync({}).then(function (result) {
    if (result) {
      return result;
    } else {
      return null;
    }
  });
}

function update(data) {
  return Promise.resolve().then(function () {
    if (data._id) {
      return OrderModel.findByIdAndUpdateAsync(data._id, _.omit(data, 'id'), { new: true });
    }
  }).catch(function (error) {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw error;
    }

    throw error;
  });
}

function createNew(data) {
  return Promise.resolve().then(function () {
    return new OrderModel(data).saveAsync().then(function (result) {
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

export default {
  query: query,
  update: update,
  createNew: createNew,

  model: OrderModel
};
