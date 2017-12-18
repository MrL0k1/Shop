'use strict';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import socketIO from 'socket.io';
import Http from 'http';
import * as _ from 'lodash';
import routes from './REST/routes';

const app = express();
app.use(express.static(__dirname + '/'));

app.use(cors());

app.use(express.static('frontend/app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '2048kb' }));

mongoose.connect('mongodb://Wojtek:qwerty123@ds159696.mlab.com:59696/sportshop', { useMongoClient: true },
  function (error) {
    if (error) {
      console.error(error);
    }
    else {
      console.log('Connect with database established');
    }
  });
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.error('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

const server = Http.createServer(app);
server.listen(8000);

const io = socketIO(server);
let sockets = [];
let temp;

io.on('connection', (socket) => {
  sockets.push(socket);

  socket.on('discount', (obj) => {
    temp = obj.price;
    _.forEach(sockets, socket => {

      obj.price = obj.price * (100 - obj.percent);
      socket.emit('promo', obj);
    });
    setTimeout(() => {
      obj.end = true;
      obj.price = temp;
      obj.percent = 0;
      _.forEach(sockets, socket => {
        socket.emit('promo', obj);
      });
    }, obj.time * 60 * 1000);

  });

  socket.on('disconnect', () => {
    sockets.splice(sockets.indexOf(socket), 1);
  });
});

routes(app);
app.listen(3000, function () {
  console.info('Server is running at 3000')
});
