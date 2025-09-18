// userModel.js
import db from "../config/db.js";

// Get all users
function getAllUsers(callback) {
    const myquery = "SELECT * FROM users";
    db.query(myquery, callback);
}

// Add a new user
function addUser(user, callback) {
    const myquery = `
        INSERT INTO users (title, descrip, type,  timeToComplete, visibility)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
        myquery,
        [
            user.title,
            user.descrip,
            user.type,
               // ✅ save created_at
            user.timeToComplete,
            user.visibility       // ✅ save visibility
        ],
        callback
    );
}

// Update user by ID
function updateUser(id, user, callback) {
    const myquery = `
        UPDATE users
        SET title=?, descrip=?, type=?, timeToComplete=?, visibility=?
        WHERE id=?
    `;
    db.query(
        myquery,
        [
            user.title,
            user.descrip,
            user.type,
            user.timeToComplete,
            user.visibility,
            id
        ],
        callback
    );
}

// Delete user by ID
function deleteUser(id, callback) {
    const myquery = "DELETE FROM users WHERE id=?";
    db.query(myquery, [id], callback);
}

// Find user by ID
function findById(id, callback) {
    const myquery = "SELECT * FROM users WHERE id=?";
    db.query(myquery, [id], callback);
}

// Find user by title
function findByTitle(title, callback) {
    const myquery = "SELECT * FROM users WHERE title=? LIMIT 1";
    db.query(myquery, [title], callback);
}

export default {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
    findById,
    findByTitle,
};
