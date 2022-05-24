require('dotenv').config();
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
const cookies = require('cookie-parser');

const port = process.env.PORT || 4001;

const mongodbUrl = !process.env.DB_URL || 'mongodb://127.0.0.1:27017/buynsell';
app.set('trust proxy', 1);
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});
app.use(cookies());
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
const peerIdRef = {};

io.on('connection', (socket) => {
  console.log('connected');
  socket.emit('onconnection', socket.id);
  socket.on('saveID', ({ id, username }) => {
    console.log(id, username);
    lookup[username] = id;
  });

  socket.on('savePeerId', ({ peerId, username }) => {
    console.log(peerId, username);
    peerIdRef[username] = peerId;
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
