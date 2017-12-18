'use strict';

import orderDAO from '../DAO/orderDAO';

function create(context) {
  function query() {
    return orderDAO.query().then(orders => {
      let notRealized = orders.filter(order => {
        if (!order.realized) {
          return order;
        }
      });
      let realized = orders.filter(order => {
        if (order.realized) {
          return order;
        }
      });
      return { "notRealized": notRealized, "realized": realized };
    });
  }

  function update(data) {
    return orderDAO.update(data);
  }

  function createNew(data) {
    return orderDAO.createNew(data);
  }

  return {
    query: query,
    update: update,
    createNew: createNew
  };
}

export default {
  create: create
};
