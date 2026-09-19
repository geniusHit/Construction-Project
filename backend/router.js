const express = require("express")
const router = express.Router()
const controller = require("./usercontroller.js")
const multer = require("multer")
const path = require("path");
const mongoose = require('mongoose');

module.exports = router