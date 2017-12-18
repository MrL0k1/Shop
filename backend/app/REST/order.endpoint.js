'use strict';

import business from '../business/business.container';

const orderEndpoint = (router) =>{
  router.route('/api/order').get((request, response) => {
    business(request).getOrderManager().query().then((result) => {
      response.status(200).send(result);
    }).catch((error) => {
      response.status(404).send(error);
    });
  });

  router.route('/api/order/update').post((request, response) => {
    business(request).getOrderManager().update(request.body).then((result) => {
      response.status(200).send(result);
    }).catch((error) => {
      response.status(404).send(error);
    });
  });

  router.route('/api/order/add').post((request, response) => {
    business(request).getOrderManager().createNew(request.body).then((result) => {
      response.status(200).send(result);
    }).catch((error) => {
      response.status(404).send(error);
    });
  });
};

export default orderEndpoint;
