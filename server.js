require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Ensure MONGO_URI exists
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env file");
    process.exit(1);
}

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// Define Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    userID: Number,
    purchases: Number,
    lastActivity: String,
    loyaltyScore: Number,
    reward: String
}, { collection: 'users' });

const User = mongoose.model("User", userSchema); // ✅ Define the model properly


// API Endpoint to Fetch All Users
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        console.log("Users from DB:", users); // 🔹 Debugging output
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.get("/api/customers", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
