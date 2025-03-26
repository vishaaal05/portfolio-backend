const express = require("express")
const router = express.Router();
const { createEnquiry } = require('../controllers/enquiry.controller');

router.post('/enquiry', createEnquiry);

module.exports = router;
