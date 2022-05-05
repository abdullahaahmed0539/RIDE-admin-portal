const jwt = require("jsonwebtoken");
const { unAuthorizedResponse } = require("../helper/responses");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { username } = req.body;
    const verify = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    if (verify.username !== username) {
      throw new Error("Access denied");
    }
    next();
  } catch (error) {
    unAuthorizedResponse(res, "UNAUTHORIZED_ACCESS");
  }
};
