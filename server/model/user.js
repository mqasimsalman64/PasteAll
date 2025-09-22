import db from "../config/db.js";

const userModel = {
    // Get all users
    getAllUsers: (callback) => {
        const sql = "SELECT * FROM users";
        db.query(sql, callback);
    },

    // Find user by title
    findByTitle: (title, callback) => {
        const sql = "SELECT * FROM users WHERE title = ?";
        db.query(sql, [title], callback);
    },

    // Add user
    addUser: ({ title, descrip, type, timeToComplete, visibility }, callback) => {
        const sql = `
            INSERT INTO users (title, descrip, type, timeToComplete, visibility, created_at) 
            VALUES (?, ?, ?, ?, ?, NOW())
        `;
        db.query(sql, [title, descrip, type, timeToComplete, visibility], callback);
    },

    // Update user
    updateUser: (id, { title, descrip, type, timeToComplete, visibility }, callback) => {
        const sql = `
            UPDATE users 
            SET title = ?, descrip = ?, type = ?, timeToComplete = ?, visibility = ? 
            WHERE id = ?
        `;
        db.query(sql, [title, descrip, type, timeToComplete, visibility, id], callback);
    },

    // Delete user
    deleteUser: (id, callback) => {
        const sql = "DELETE FROM users WHERE id = ?";
        db.query(sql, [id], callback);
    },
};

export default userModel;
