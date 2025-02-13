// import mongoose from "mongoose";
const mongoose = require("mongoose");
const cartProductSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const CartProductModel = mongoose.model("CartProduct", cartProductSchema);

module.exports = CartProductModel;
