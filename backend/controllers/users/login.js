const bcrypt = require("bcrypt");
const { use } = require("bcrypt/promises");
const jwt = require("jsonwebtoken");
const {
  onMissingValResponse,
  notFoundResponse,
  unAuthorizedResponse,
  successfulGetResponse,
  serverErrorResponse,
} = require("../../helper/responses");
const User = require("../../models/Admins");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      onMissingValResponse(
        res,
        "MISSING_PARAMS",
        "Either username or password is missing."
      );
      return;
    }
    const user = await User.findOne({ username });
    if (!user) {
      notFoundResponse(
        res,
        "USER_NOT_FOUND",
        "NO_USER_FOUND",
        "There is no user with the following username."
      );
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      unAuthorizedResponse(res, "UNAUTHORIZED_ACCESS");
      return;
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: "1h" }
    );

    successfulGetResponse(res, {
      token,
      username,
      _id: user._id,
    });
  } catch (err) {
    serverErrorResponse(res, err, "INTERNAL_SERVER_ERROR");
  }
};
