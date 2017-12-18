'use strict';

import sha1 from 'sha1';
const _ = require('lodash');
import userDAO from '../DAO/userDAO';

function create(context) {
  function hashPassword(password) {;
    return sha1(password);
  }

  function authenticate(email, password) {
    let userData;
    return userDAO.getByEmail(email).then((user) => {
      if(!user) {
        throw new Error('error');
      }
      userData = user;
      return userDAO.authorize(user._id, hashPassword(password));
    }).then(() => {
      return userDAO.create(userData);
    }).then(token => {
      return token;
    });
  }

  function getToken(token) {
    return { token: token.value };
  }

  return {
    authenticate: authenticate,
  };
}

export default {
  create: create
};

