const express = require("express");
const router = express.Router();
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const { signup, login } = require("../services/authService");

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);

module.exports = router;
