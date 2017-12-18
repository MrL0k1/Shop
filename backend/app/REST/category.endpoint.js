'use strict';

import business from '../business/business.container';

const categoryEndpoint = (router) =>{
  router.route('/api/category').get((request, response) => {
    business(request).getCategoryManager().query().then((result) => {
      response.status(200).send(result);
    }).catch((error) => {
      response.status(404).send(error);
    });
  });
};

export default categoryEndpoint;
