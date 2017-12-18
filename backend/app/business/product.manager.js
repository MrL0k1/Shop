'use strict';

import ProductDAO from '../DAO/productDAO';

function create(context) {
  function createNew(data) {
    return ProductDAO.createNew(data);
  }

  function update(data) {
    return ProductDAO.update(data);
  }

  function query() {
    return ProductDAO.query();
  }

  function get(id) {
    return ProductDAO.get(id);
  }

  function deleteById(id) {
    return ProductDAO.deleteById(id)
  }

  return {
    createNew: createNew,
    update: update,
    query: query,
    get: get,
    deleteById: deleteById
  };
}

export default {
  create: create
};
