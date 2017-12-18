'use strict';

import business from '../business/business.container';

const userEndpoint = (router) => {
  router.route('/api/user/auth').post((request, response) => {
    business(request).getUserManager().authenticate(request.body.email, request.body.password).then((result) => {
      response.status(200).send(result);
    });
  })
};


export default userEndpoint;
