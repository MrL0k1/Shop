'use strict';

const _ = require('lodash');
const mongoose = require('mongoose-bird')(require('mongoose'));
const Promise = require('bluebird');
import jwt from 'jsonwebtoken';

const userRoleEnum = {
  admin: 'admin', user: 'user'
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String
  },
  token: {
    type: String,
    required: true
  }
}, {
  collection: 'user'
});

const UserModel = mongoose.model('user', userSchema);

function createNewOrUpdate(data) {
  return Promise.resolve().then(() => {
    if (!data.id) {
      return new UserModel(data).saveAsync().then((result) => {
        if (result[0]) {
          return result[0];
        }
      });
    } else {
      return UserModel.findByIdAndUpdateAsync(data.id, _.omit(data, 'id'), { new: true });
    }
  }).catch(function (error) {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw Error();
    }

    throw error;
  });
}

function getByEmail(email) {
  return UserModel.findOneAsync({ email: email }).then((result) => {
    if (result) {
      return result;
    }
  });
}

function authorize(userId, password) {
  return UserModel.findOneAsync({ _id: userId, password: password }).then((result) => {
    if (result) {
      return true;
    }
    throw Error();
  })
}

function create(user) {
  let access = 'auth';
  let value = jwt.sign({
      userId: user._id,
      name: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    },
    'secret');
  return value;
  // return UserModel.findByIdAndUpdateAsync(user._id, _.omit(data, '_id'), { token: value }).then((result) => {
  //   console.log('dupa');
  //   if (result) {
  //     return true;
  //   }
  //   throw Error()
  // })
}

export default {
  createNewOrUpdate: createNewOrUpdate,
  getByEmail: getByEmail,
  authorize: authorize,
  create: create,

  userRoleEnum: userRoleEnum,
  model: UserModel
};

// createNewOrUpdate({
//     "_id": "51eae100c2e6b6c222ec3442",
//     "email": "admin",
//     "password": "d033e22ae348aeb5660fc2140aec35850c4da997",
//     "role": "admin"
// });




