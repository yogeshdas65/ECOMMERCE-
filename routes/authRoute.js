const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const User = require("../models/userModel");

const {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} = require("../controllers/authController");

const router = express.Router();

// Register || Method POST
router.post("/register", registerController);

// Login || Method POST
router.post("/login", loginController);

//forgot password
router.post("/forgot-password", forgotPasswordController);

//test controller
router.get("/test", (req, res) => {
  res.status(200).send("hello");
});
//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//Protected Admin Route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//update profile
router.put("/profile", requireSignIn, updateProfileController);
//get orders / user
router.get("/orders", requireSignIn, getOrdersController);
//all order / admin
router.get("/all-order", requireSignIn, isAdmin, getAllOrdersController);
// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

module.exports = router;
