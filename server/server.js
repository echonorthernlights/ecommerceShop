// require("dotenv").config();
// const express = require("express");
import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import productsRouter from "./routes/api/products.js";
import userRouter from "./routes/api/users.js";
import ordersRouter from "./routes/api/orders.js";
import uploadRouter from "./routes/api/upload.js";
import connectDB from "../db/connectDB.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

//const products = require("./data/products");
//const productsRouter = require("./routes/api/products");

app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/upload", uploadRouter);

//fetch paypal client  id
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
//upload dir as static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
//error handeling middleware
app.use(notFound);

app.use(errorHandler);

const start = async () => {
  const url = process.env.MONGO_URI;
  try {
    await connectDB(url);
    app.listen(PORT, () => {
      console.log(
        `Server Running in ${process.env.NODE_ENV} mode on PORT: ${PORT} ...`
          .yellow.bold
      );
    });
  } catch (error) {
    console.log(`Error ${error.message} .../`);
  }
};
start();
