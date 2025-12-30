import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import UserModel from "./models/User.js";
import FeedbackModel from './models/Feedback.js';

const app = express();
app.use(express.json());
app.use(cors());

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist')));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

// --- REGISTER ROUTE (UPDATED) ---
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            res.json("Already have an account");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            await UserModel.create({ name, email, password: hashedPassword });
            res.json("Account Created");
        }
    } catch (err) {
        res.json(err);
    }
});

// --- LOGIN ROUTE (UPDATED) ---
app.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });

        if (user) {
            // 3. Compare the typed password with the hashed password in DB
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                res.json({ status: "Success", name: user.name })
            } else {
                res.json("Incorrect password");
            }
        } else {
            res.json("No record existed");
        }
    } catch (err) {
        res.json(err);
    }
});

app.post('/feedback', (req, res) => {
    const { name, email, message } = req.body;
    FeedbackModel.create({ name, email, message })
        .then(feedback => res.json({ status: "Success", data: feedback }))
        .catch(err => res.status(500).json({ status: "Error", error: err }));
});

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});