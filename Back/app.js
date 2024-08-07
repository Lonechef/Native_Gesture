require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add CORS
const app = express();

app.use(express.json());
app.use(cors()); // Use CORS

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(() => {
    console.log("Database connected");
}).catch((e) => {
    console.log(e);
});

require('./UserDetails');
const User = mongoose.model("UserInfo");

app.listen(4000, () => {
    console.log("Server has been started");
});

app.post('/register', async (req, res) => {
    const { name, mobile, password } = req.body;

    const oldUser = await User.findOne({ mobile: mobile });
    if (oldUser) {
        return res.send({ data: "User already exists. Please enter a new number." });
    }

    try {
        await User.create({ name, mobile, password });
        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", data: "User creation failed" });
    }
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name: name });

        if (!user) {
            return res.status(404).send({ status: "error", data: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).send({ status: "error", data: "Invalid password" });
        }

        res.send({ status: "ok", data: "Login successful" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", data: "Login failed" });
    }
});

app.get('/', (req, res) => {
    res.send({ status: "Started" });
});
