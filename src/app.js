const express = require("express");
const cors = require("cors");
const enquiryRoutes = require('./routes/enquiry.route');
const app = express();

app.use(express.json());
app.use(cors());

app.use("/v1/api/user", enquiryRoutes)

module.exports = app;
