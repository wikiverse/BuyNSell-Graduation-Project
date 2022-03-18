const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const { isLoggedIn } = require('../Middleware/middleware');
const user = require('../Models/user');

const saltRounds = 9;

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
      console.log(req.session);
      req.session.user_id = user._id;
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route('/userinfo').post(async (req, res) => {
  try {
    const { user_id } = req.session;
    const user = await User.findOne({ _id: user_id });
    if (user) {
      res.status(200).json({
        fullname: user.fullName,
        username: user.username,
        email: user.email,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.route('/issigned').get(isLoggedIn, async (req, res) => {
  res.json({ status: 'logged' });
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
