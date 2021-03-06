const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../Models/product');
const fetch = require('node-fetch');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router
  .route('/all')
  .get(async (req, res) => {
    try {
      const products = await Product.find({}).populate({
        path: 'author',
        select: ['username', 'fullName', 'imgUrl'],
      });
      res
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .json({ data: products });
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    try {
      const products = await Product.find({}).populate({
        path: 'author',
        select: ['username', 'fullName', 'imgUrl'],
      });
      res
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .json({ data: products });
    } catch (error) {
      console.log(error);
    }
  });

router.route('/search').get(async (req, res) => {
  const query = req.query.query;
  const products = await Product.find({
    title: { $regex: new RegExp(query, 'i') },
  }).populate({
    path: 'author',
    select: ['username', 'fullName', 'imgUrl'],
  });
  res
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json({ data: products });
});

router.route('/new').post(upload.single('image'), async (req, res) => {
  try {
    const host = req.headers.host;
    const imageUrl = req.protocol + '://' + host + '/' + req.file.path;
    const { title, price, description, isNegotiable } = req.body;
    const newProduct = new Product({
      author: req.session.user_id,
      title,
      description,
      isNegotiable,
      price,
      imageUrl,
      isSold: false,
      date: Date.now(),
    });
    await newProduct.save();
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate({
        path: 'author',
      });
      const data = {
        author: {
          username: product.author.username,
          fullname: product.author.fullName,
          email: product.author.email,
          imgUrl: product.author.imgUrl,
        },
        imageUrl: product.imageUrl,
        title: product.title,
        description: product.description,
        date: product.date,
        price: product.price,
        isNegotiable: product.isNegotiable,
        isSold: product.isSold,
      };
      res
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .json({ data: data });
    } catch (error) {
      console.log(error);
    }
  })
  .patch(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      const { isSold } = req.body;
      product.isSold = isSold;
      await product.save();
      console.log(product);
      res.status(200);
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req, res) => {
    const product = await Product.findById(req.params.id);
    await Product.deleteOne({ _id: req.params.id });
    res.send('DELETED');
  });

router.route('/smart-match').post(async (req, res) => {
  const { description } = req.body;

  try {
    const response = await fetch(`http://127.0.0.1:5000/smart-match`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: description,
      }),
    });
    const data = await response.json();
    const products = [];
    for (const d of data) {
      products.push(
        await Product.findById(d._id).populate({
          path: 'author',
          select: ['username', 'fullName', 'imgUrl'],
        })
      );
    }
    console.log(products);
    res
      .setHeader('Content-Type', 'application/json')
      .status(200)
      .json({ data: products });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
