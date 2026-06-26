const express = require("express");
const router = express.Router();

const {
    getApplications,
    getApplicationById,
    updateApplication,
    createApplication
} = require("../controllers/applicationController");
router.get("/", getApplications);

router.get("/:id", getApplicationById);

router.put("/:id", updateApplication);

router.post("/", createApplication);

module.exports = router;