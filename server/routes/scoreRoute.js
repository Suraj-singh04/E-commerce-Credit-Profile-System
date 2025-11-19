const express = require("express");
const dynamicScore = require("../controllers/score-controller");
const router = express.Router();

router.post("/:id/score", dynamicScore);

module.exports = router;
