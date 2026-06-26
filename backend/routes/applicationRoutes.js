const verifyAdmin = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

const {
    getApplications,
    getApplicationById,
    updateApplication,
    createApplication
} = require("../controllers/applicationController");
router.get("/", verifyAdmin, getApplications);

router.get("/:id", verifyAdmin, getApplicationById);

router.put("/:id", verifyAdmin, updateApplication);

router.post("/", createApplication);

module.exports = router;