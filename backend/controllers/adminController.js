// backend/controllers/adminController.js

const loginAdmin = (req, res) => {
    const { email, password } = req.body;

    const ADMIN_EMAIL = "admin@mbbsiuk.com";
    const ADMIN_PASSWORD = "Admin@123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return res.status(200).json({
            success: true,
            message: "Login successful"
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