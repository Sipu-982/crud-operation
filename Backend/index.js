const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./Models/CreateUser');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB with error handling
mongoose.connect("mongodb://127.0.0.1:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Fetch all users
app.get('/', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Get a single user by ID
app.get('/getuser/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

// Create a new user
app.post('/createUser', async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: "Failed to create user" });
    }
});

// Update user details
app.put('/updateuser/:id', async (req, res) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                mail: req.body.mail,
                phone: req.body.phone,
                age: req.body.age
            },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: "Failed to update user" });
    }
});

// delete user details
app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});


// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
