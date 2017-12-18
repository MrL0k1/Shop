'use strict';

import business from '../business/business.container';

const productEndpoint = (router) => {
  router.route('/api/products').get((request, response) => {
    business(request).getProductManager().query().then((result) => {
      response.status(200).send(result);
    }).catch((error) => {
      response.status(404).send(error);
    });
  });

  router.route('/api/product/:id').get((request, response) => {
    business(request).getProductManager().get(request.params.id).then((result) => {
      response.status(200).send(result);
    }).catch((error) => {
      response.status(404).send(error);
    });
  });

  router.route('/api/product').post((request, response) => {
    business(request).getProductManager().createNew(request.body).then((result) => {
      response.status(200).send(result);
    }).catch((error) => {
      response.status(404).send(error);
    });
  });

  router.route('/api/product/update').post((request, response) => {
    business(request).getProductManager().update(request.body).then((result) => {
      response.status(200).send(result);
    }).catch((error) => {
      response.status(404).send(error);
    });
  });

  router.route('/api/product/delete/:id').delete((request, response) => {
    business(request).getProductManager().deleteById(request.params.id).then((result) => {
      response.status(200).send(result);
    }).catch((error) => {
      response.status(404).send(error);
    });
  });
};


export default productEndpoint;
