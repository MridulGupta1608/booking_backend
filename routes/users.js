const express = require("express");
const router = express.Router();
const User = require("../Models/user.model");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.send({
      message: "Some error",
      success: false,
    });
  }
});

router.post("/", verifyToken, (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  user
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("error");
    });
});

module.exports = router;
