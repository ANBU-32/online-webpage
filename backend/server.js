require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// ==========================
// Security
// ==========================

app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json({
    limit: "10kb"
}));

// ==========================
// Rate Limiter
// ==========================

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

app.use(limiter);

// ==========================
// Database
// ==========================

const pool = require("./config/db");

// ==========================
// Routes
// ==========================

const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

// ==========================
// Home Route
// ==========================

app.get("/", (req, res) => {
    res.send("✅ MBBS IUK Backend is Running");
});

// ==========================
// Database Test
// ==========================

pool.connect()
    .then(client => {
        console.log("✅ PostgreSQL Connected");
        client.release();
    })
    .catch(err => {
        console.error("❌ Database Error");
        console.error(err);
    });

// ==========================
// Start Server
// ==========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
