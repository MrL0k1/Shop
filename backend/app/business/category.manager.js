'use strict';

import categoryDAO from '../DAO/categoryDAO';

function create(context) {
  function query() {
    return categoryDAO.query().then(data => {
      let categories = [];
      data.map(a => categories.push(a['category']));
      return categories.filter((x, i, a) => a.indexOf(x) === i).sort();
    });
  }

  return {
    query: query
  };
}

export default {
  create: create
};
