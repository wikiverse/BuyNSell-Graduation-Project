const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const { isLoggedIn } = require('../Middleware/middleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, req.session.user_id + file.originalname);
  },
});

upload = multer({ storage });
const saltRounds = 9;

router
  .route('/profilepicture')
  .post(upload.single('image'), async (req, res) => {
    const { user_id } = req.session;
    try {
      const host = req.headers.host;
      const imageUrl = req.protocol + '://' + host + '/' + req.file.path;
      await User.findByIdAndUpdate(user_id, { imgUrl: imageUrl });
      res
        .setHeader('Content-Type', 'application/json')
        .status(201)
        .json({ imageUrl });
    } catch (error) {
      res.status(400);
      console.log(error);
    }
  });

router.route('/signup').post(async (req, res) => {
  try {
    const { username, email, fullName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      fullName: fullName,
      password: hashedPassword,
    });

    await newUser.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route('/signin').post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.user_id = user._id;
      req.session.username = user.username;
      req.session.fullname = user.fullName;
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route('/signout').post((req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200);
    }
  });
});

router.route('/userinfo').get(async (req, res) => {
  try {
    const { user_id } = req.session;
    const user = await User.findOne({ _id: user_id });
    if (user) {
      res.status(200).json({
        fullname: user.fullName,
        username: user.username,
        email: user.email,
        imageUrl: user.imgUrl,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.route('/issigned').get(isLoggedIn, async (req, res) => {
  res.json({
    status: 'logged',
    username: req.session.username,
    fullname: req.session.fullname,
  });
});

router.route('/isemailavailable').post(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user)
      res.status(200).json({
        message: 'This email is not available for registration.',
        isAvailable: false,
      });
    else
      res
        .status(200)
        .json({ message: 'This email is available.', isAvailable: true });
  } catch (error) {
    res.status(200).json({ message: 'error' });
  }
});

router.route('/isusernameavailable').post(async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username.toLowerCase() });
    if (user)
      res.status(200).json({
        message: 'This username is not available for registration.',
        isAvailable: false,
      });
    else
      res
        .status(200)
        .json({ message: 'This username is available.', isAvailable: true });
  } catch (error) {
    res.status(200).json({ message: 'error' });
  }
});

module.exports = router;
