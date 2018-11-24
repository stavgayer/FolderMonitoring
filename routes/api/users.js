const mongoose = require("mongoose");
const router = require("express").Router();
const Users = mongoose.model("Users");
const auth = require("../../middleware/auth");
// POST new user (only used to create the admin , this is why i dont validate data and etc...)
router.post("/", (req, res, next) => {
  const {
    body: { user }
  } = req;

  if (!user.username) {
    return res.status(422).json({
      errors: {
        username: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser
    .save()
    .then(() => res.sendStatus(200));
});

//login route
router.post("/login", (req, res, next) => {
  const {
    body: { user }
  } = req;
  console.log(user);
  if (!user.username) {
    return res.status(422).json({
      errors: {
        username: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }
  Users.authenticate(user.username, user.password, (error, user) => {
    console.log(error, user);
    if (error || !user) {
      var err = new Error("Wrong email or password.");
      err.status = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
      res.json(req.session.userId);
    }
  });
});
router.get("/current", auth, (req, res) => {
  res.sendStatus(200);
});

router.get("/logout", auth, (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.sendStatus(200);
      }
    });
  }
});

module.exports = router;
