const User = require("../Models/user.model");
const { createJwtToken } = require("../utils/token.util");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && password === user.password) {
      const token = createJwtToken({ userId: user._id });

      res.status(200).json({
        type: "success",
        message: "Credential verified",
        data: {
          token,
          userId: user._id,
          role: user.role,
        },
      });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log("error");
    res.sendStatus(400);
  }
};
