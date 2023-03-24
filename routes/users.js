const express = require("express");
const router = express.Router();
const User = require("../Models/user.model");
const verifyToken = require("../middleware/auth");
const mongoose = require("mongoose");

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

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      // return an error response if userId is not a valid ObjectId
      return res.status(400).send("Invalid userId");
    }

    const user = await User.findById(userId);

    if (!user) {
      // return an error response if user is not found
      return res.status(404).send("User not found");
    }

    res.send({ user });
    console.log(`data : ${user}`);
  } catch (error) {
    console.log(error.message);
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
