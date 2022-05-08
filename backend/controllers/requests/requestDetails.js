const Request = require("../../models/Requests");
const User = require("../../models/Users");
const {
  successfulGetResponse,
  serverErrorResponse,
  notFoundResponse,
} = require("../../helper/responses");

exports.requestDetails = async (req, res) => {
  const { _id } = req.body;

  try {
    let request = await Request.findById({ _id });
    if (!request) {
      notFoundResponse(
        res,
        "NOT_FOUND",
        "RequestNotFound",
        "Request is not found"
      );
      return;
    }

    const driverDetails = await User.findById({ _id: request.userId }).select('firstName lastName')
    request._doc = {
      ...request._doc,
      firstName: driverDetails.firstName,
      lastName: driverDetails.lastName,
    };
    successfulGetResponse(res, { request });
  } catch (err) {
    serverErrorResponse(res, err, "INTERNAL_SERVER_ERROR");
  }
};
