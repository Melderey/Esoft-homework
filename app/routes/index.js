const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController.js");

router
  .route("/api/game")
  .get((req, res) => {
    gameController.gamesResult(req, res);
  })
  .post((req, res) => {
    gameController.finishGame(req, res);
  });

router.route("/api/gamestatistics").post((req, res) => {
  gameController.getGameStatistics(req, res);
});
module.exports = router;
