const { default: slugify } = require("slugify");
const Product = require("../models/productModels");
const fs = require("fs");
const braintree = require("braintree");
const Order = require("../models/orderModel");
const dotenv = require("dotenv");

dotenv.config();

//payment getway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const createProductController = async (req, res) => {
  try {
    const { name, describtion, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !describtion:
        return res.status(500).send({ error: "describtion is Required" });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "shipping is Required" });
    }
    //instance for a new product
    const products = new Product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    //save product + photo path
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, describtion, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !describtion:
        return res.status(500).send({ error: "describtion is Required" });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "shipping is Required" });
    }
    //instance for a new product
    const products = await Product.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    //save product + photo path
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updating successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product",
    });
  }
};

//Get products
const getProductController = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      messege: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
      messege: "Error in getting products",
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      messege: "Single Product Fetch",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
      messege: "Error while getting single products",
    });
  }
};

const productPhotoController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await Product.findById(pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    // res.status(200).send({
    //   success: true,
    //   product,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
      messege: "Error while getting photo",
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      messege: "Error while deleting product",
    });
  }
};

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const foundproducts = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        {
          describtion: { $regex: keyword, $options: "i" },
        },
      ],
    }).select("-photo");
    res.status(200).send({
      success: true,
      messege: "Single Product Fetch",
      foundproducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Search Product API",
    });
  }
};

const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createProductController,
  updateProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  searchProductController,
  braintreeTokenController,
  braintreePaymentController,
};
