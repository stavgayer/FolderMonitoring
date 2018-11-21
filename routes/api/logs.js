const mongoose = require("mongoose");
const router = require("express").Router();
const Logs = mongoose.model("Logs");
const auth = require("../../middleware/auth");
const { startWatching, stopWatching } = require("../../services/watcher");

router.post("/start", auth, (req, res, next) => {
  const {
    body: { folder }
  } = req;
  startWatching(folder)
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
});

router.get("/get", auth, (req, res, next) => {
  Logs.find({}, (err, logs) => {
    if (err) {
      next(err);
    } else {
      res.json(logs);
    }
  });
});

router.post("/stop", auth, (req, res, next) => {
  stopWatching()
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
});

module.exports = router;
