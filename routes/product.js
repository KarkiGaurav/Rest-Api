const express = require("express");
const router = express.Router();

const {getAllProduct, getAllProductTest} = require("../controllers/product");

router.route("/").get(getAllProduct);
router.route("/testing").get(getAllProductTest);


module.exports = router;