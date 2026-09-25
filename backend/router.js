const express = require("express")
const router = express.Router()
const controller = require("./usercontroller.js")
const multer = require("multer")
const path = require("path");
const mongoose = require('mongoose');

router.post("/add-user", controller.addUser)

router.post("/send-signup-otp", controller.sendSignupOtp)

router.post("/login-user", controller.loginUser)

router.post("/create-material", controller.createMaterial)

router.post("/get-materials", controller.getMaterials)

router.post("/get-current-login", controller.getCurrentLogin)

router.post("/compare-prices", controller.comparePrices)

router.get("/recent-products", controller.recentProducts)

router.post("/quote-request", controller.quoteRequest)

module.exports = router