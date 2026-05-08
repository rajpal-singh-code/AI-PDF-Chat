const express = require('express');
const connectDB = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require("cors");

require('dotenv').config();
const app = express();

const authRouter = require("./routes/authRoutes.js");
const pdfRoutes = require("./routes/pdfRoutes.js");

// ✅ CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieparser());

app.get("/", (req, res) => {
    res.send("Welcome to the Authentication API");
});

app.use("/api", authRouter);
app.use("/api", pdfRoutes);
const startServer = async() => {
    try{
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error starting server:", error.message);
        process.exit(1);
    }
};

startServer();

module.exports = app;