const express = require("express");
const services = require("../controllers/service-controller");
const router = express.Router();

router.route("/service").post(services);

module.exports = router;
