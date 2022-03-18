const app = require('express')();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./src/Routes/user');

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
const sessionConfig = {
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

app.listen(port, () => {
  console.log('Listening on Port ' + port);
});
