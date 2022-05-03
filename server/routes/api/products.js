// const products = require("../../data/products");
// const express = require("express");

import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../../models/productModel.js";
const router = express.Router();

// @desc fetch all products
// @route GET /api/products
// @access public
router.route("/").get(
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc fetch a single product
// @route GET /api/products/:id
// @access public
router.route("/:id").get(
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

export default router;

//module.exports = router;
