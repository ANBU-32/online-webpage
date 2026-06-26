const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Import database
const pool = require("./config/db");

// Import routes
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.json());

app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to MBBS IUK Backend 🚀");
});

// Test database connection
pool.connect()
    .then(() => console.log("✅ PostgreSQL Connected"))
    .catch(err => console.error("❌ Database Connection Error:", err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});