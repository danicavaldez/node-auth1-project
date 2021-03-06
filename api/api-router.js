const router = require("express").Router();

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");

router.use("/auth", authRouter);
router.use("/users", usersRouter);

router.get("/", (req, res) => {
  res.send("<h1>Node Auth1 Project!</h2>");
});

module.exports = router;
