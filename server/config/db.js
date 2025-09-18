import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql2.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});

console.log("host is", process.env.HOST, process.env.PORT, process.env.USER, process.env.PASSWORD, process.env.DATABASE);

db.connect((err) => {
    if (err) {
        console.error("❌ DB connection failed:", err.message);
    } else {
        console.log("✅ Connected to database!");
    }
});

export default db;
