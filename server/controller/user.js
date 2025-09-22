import userModel from "../model/user.js";

// Get all users
function getUsers(req, res) {
    userModel.getAllUsers((err, result) => {
        if (err) return res.status(500).json({ error: "DB error" });
        return res.json(result);
    });
}

// Create user
function createUser(req, res) {
    const { title, descrip, type, timeToComplete, visibility } = req.body;

    if (!title || !type) {
        return res.status(400).json({ error: "Title and type are required" });
    }

    userModel.findByTitle(title, (err, result) => {
        if (err) return res.status(500).json({ error: "DB error" });

        if (result.length > 0) {
            return res.status(400).json({ error: "User with this title already exists" });
        }

        userModel.addUser(
            { title, descrip, type, timeToComplete, visibility },
            (err, result) => {
                if (err) return res.status(500).json({ error: "Error adding user" });

                res.status(201).json({
                    id: result.insertId,
                    title,
                    descrip,
                    type,
                    timeToComplete,
                    visibility,
                });
            }
        );
    });
}

// Update user
function updateUser(req, res) {
    const { id } = req.params;
    const { title, descrip, type, timeToComplete, visibility } = req.body;

    userModel.updateUser(
        id,
        { title, descrip, type, timeToComplete, visibility },
        (err, result) => {
            if (err) return res.status(500).json({ error: "DB update error" });

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json({ success: true });
        }
    );
}

// Delete user
function deleteUser(req, res) {
    const { id } = req.params;

    userModel.deleteUser(id, (err, result) => {
        if (err) return res.status(500).json({ error: "DB delete error" });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ success: true, id });
    });
}

export default {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
