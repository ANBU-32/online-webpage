require("dotenv").config();

const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Access denied."
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.admin = decoded;

        next();

    } catch {

        return res.status(401).json({
            success: false,
            message: "Invalid token."
        });

    }

};

module.exports = verifyAdmin;