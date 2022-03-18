const express = require('express');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user_id) {
    return res.json({ status: 'not logged' });
  }
  next();
};
