// backend/controllers/adminController.js

require("dotenv").config();

const jwt = require("jsonwebtoken");

const loginAdmin = (req, res) => {
    const { email, password } = req.body;

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign(
    {
        email: ADMIN_EMAIL,
        role: "admin"
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "8h"
    }
);
       return res.status(200).json({
    success: true,
    message: "Login successful",
    token
});
    }

    return res.status(401).json({
        success: false,
        message: "Invalid email or password"
    });
};

module.exports = {
    loginAdmin
};