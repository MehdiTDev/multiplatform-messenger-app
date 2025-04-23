const express = require("express");
const { registerUser } = require("../controllers/userControllers");

const router = express.Router();

router
  .route("/")
  .get(() => {})
  .post(registerUser);

router.post("/login", authUser);

module.exports = router;
