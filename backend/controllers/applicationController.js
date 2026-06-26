const pool = require("../config/db");

// Get all applications
// Get one application by ID
const getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM applications WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
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

const fullName = name?.trim();
const userEmail = email?.trim().toLowerCase();
const userMobile = mobile?.trim();

const emailExists = await pool.query(
    "SELECT id FROM applications WHERE email = $1",
    [userEmail]
);

if (emailExists.rows.length > 0) {
    return res.status(409).json({
        success: false,
        message: "Email already registered."
    });
}

const mobileExists = await pool.query(
    "SELECT id FROM applications WHERE mobile = $1",
    [userMobile]
);

if (mobileExists.rows.length > 0) {
    return res.status(409).json({
        success: false,
        message: "Mobile already registered."
    });
}


        const result = await pool.query(
            `INSERT INTO applications
            (full_name,mobile,email,state,neet_qualified,neet_score)
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *`,
            [
    fullName,
    userMobile,
    userEmail,
    state,
    neet,
    neetscore || null
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
            message:"Internal Server Error"
        });

    }

};

// Update application
const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            full_name,
            mobile,
            email,
            state,
            neet_qualified,
            neet_score
        } = req.body;

        const result = await pool.query(
            `UPDATE applications
             SET full_name = $1,
                 mobile = $2,
                 email = $3,
                 state = $4,
                 neet_qualified = $5,
                 neet_score = $6
             WHERE id = $7
             RETURNING *`,
            [
                full_name,
                mobile,
                email,
                state,
                neet_qualified,
                neet_score,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.json({
            success: true,
            message: "Student updated successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Internal Server Error"
        });
    }
};

module.exports = {
    getApplications,
    getApplicationById,
    updateApplication,
    createApplication
};