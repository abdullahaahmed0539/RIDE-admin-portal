const router = require("express").Router();
const { login } = require("../controllers/users/login");
const { register } = require("../controllers/users/register");

router.post("/register", register);
router.get("/login", login);

module.exports = router;
