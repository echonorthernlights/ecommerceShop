import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc fetch all products
// @route GET /api/products
// @access public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("No products !!");
  }
});

// @desc fetch product by Id
// @route GET /api/products/:id
// @access public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("No product found !!");
  }
});

// @desc delete product
// @route DELETE /api/products/:id
// @access pprivate/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("No product found !!");
  }
});

// @desc delete product
// @route DELETE /api/products/:id
// @access private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    description: "Sample description",
    countInStock: 0,
    nemReviews: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc update product
// @route PUT /api/products/:id
// @access private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, brand, category, description, countInStock, image } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.countInStock = countInStock;
    product.image = image;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found !!");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
