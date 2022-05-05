const bcrypt = require("bcrypt");
const {
  serverErrorResponse,
  onCreationResponse,
} = require("../../helper/responses");
const User = require("../../models/Users");

exports.register = async (req, res) => {
  //storing values passed from client side
  const { username, password } = req.body;

  //encrypt the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      serverErrorResponse(res, err, "INTERNAL_SERVER_ERROR");
      return;
    }

    //create new user
    var newUser = new User({ username, password: hashedPassword });

    //save the user in db
    newUser.save(function (err, user) {
      if (err) {
        serverErrorResponse(res, err, "INTERNAL_SERVER_ERROR");
        return;
      }
      onCreationResponse(res, {});
    });
  });
};
