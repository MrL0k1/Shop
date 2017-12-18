'use strict';

import userManager from './user.manager';
import categoryManager from './category.manager';
import productManager from './product.manager';
import orderManager from './order.manager';

function getContext(request) {
  return { user: request && request.user };
}

function getter(manager, request) {
  return function () {
    return manager.create(getContext(request), this);
  };
}

const business = function createBusinessContainer(request) {

  return {
    getUserManager: getter(userManager, request),
    getCategoryManager: getter(categoryManager, request),
    getProductManager: getter(productManager, request),
    getOrderManager: getter(orderManager, request)
  };
};

export default business;
