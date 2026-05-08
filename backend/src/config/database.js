const mongoose = require('mongoose');
 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "UserAdmin",
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;