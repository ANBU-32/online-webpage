const pool = require("../config/db");

// Get all applications
const getApplications = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM applications ORDER BY id DESC"
        );

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Create a new application
const createApplication = async (req, res) => {

    try {

        const {
            name,
            mobile,
            email,
            state,
            neet,
            neetscore
        } = req.body;

        const result = await pool.query(
            `INSERT INTO applications
            (full_name,mobile,email,state,neet_qualified,neet_score)
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *`,
            [
                name,
                mobile,
                email,
                state,
                neet,
                neetscore
            ]
        );

        res.status(201).json({
            success:true,
            message:"Registration Successful",
            data:result.rows[0]
        });

    } catch(error){

        console.error(error);

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

module.exports = {
    getApplications,
    createApplication
};