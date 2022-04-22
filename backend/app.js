const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./src/Routes/user');
const productRoutes = require('./src/Routes/product');
const MongoStore = require('connect-mongo');

const port = 4001;

const mongodbUrl = 'mongodb://127.0.0.1:27017/buynsell';
const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUrl);
    mongoose.connection.once('open', () =>
      console.log('Mongodb connection success')
    );
  } catch (error) {
    console.error(error);
  }
};
connectDB();
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: mongodbUrl,
    touchAfter: 24 * 3600,
  }),
  name: 'session',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use('/user', userRoutes);
app.use('/product', productRoutes);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const lookup = {};

io.on('connection', (socket) => {
  console.log('connected');
  socket.emit('onconnection', socket.id);
  socket.on('saveID', ({ id, username }) => {
    console.log(id, username);
    lookup[username] = id;
  });

  socket.on('call', (obj) => {
    console.log(obj);
    io.to(lookup[obj.callee]).emit('call', obj);
  });

  socket.on('answer', (obj) => {
    console.log('answer');
    console.log(obj);
    io.to(lookup[obj.caller]).emit('accept', obj.signal);
  });

  socket.on('disconnect', () => {
    for (let key in lookup) {
      if (lookup[key] === socket.id) {
        delete lookup[key];
      }
    }
    console.log('disconnected');
  });
});

server.listen(port, () => {
  console.log('Listening on Port ' + port);
});
