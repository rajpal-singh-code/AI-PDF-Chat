const validator = require('validator');

const validateSignupData = (req) => {
    if (!req.body) {
        throw new Error("Invalid request: No data provided");
    }
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("First name and last name are required");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Please provide a valid email");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be at least 8 characters and include uppercase, numbers, and symbols");
    }
};

module.exports = { validateSignupData };