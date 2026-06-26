const express = require("express");
const router = express.Router();

const {
    getApplications,
    createApplication
} = require("../controllers/applicationController");

router.get("/", getApplications);

router.post("/", createApplication);

module.exports = router;