const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mbbs_iuk",
    password: "Ascex24006@",
    port: 5432,
});

module.exports = pool;