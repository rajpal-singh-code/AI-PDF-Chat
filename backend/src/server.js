const express = require('express');
const connectDB = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require("cors");

require('dotenv').config();
const app = express();

const authRouter = require("./routes/authRoutes.js");
const pdfRoutes = require("./routes/pdfRoutes.js");

app.use(cors({
    origin: ["http://localhost:5173", "https://ai-pdf-chat-bfis.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieparser());

app.get("/", (req, res) => {
    res.send("Welcome to the Authentication API");
});

app.use("/api", authRouter);
app.use("/api", pdfRoutes);

const startServer = async() => {
    try {
        await connectDB();
        // Use a default port if process.env.PORT is not defined for local testing
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.error("Error starting server:", error.message);
        process.exit(1);
    }
};

startServer();

module.exports = app;