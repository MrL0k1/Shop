'use strict';

import userEndpoint from './user.endpoint';
import categoryEndpoint from './category.endpoint';
import productEndpoint from './product.endpoint';
import orderEndpoint from './order.endpoint';

const routes = function (router) {
  userEndpoint(router);
  categoryEndpoint(router);
  productEndpoint(router);
  orderEndpoint(router);
};


export default routes;
