const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [4, "First name must be at least 4 characters long"],
        maxlength: [50, "First name must be less than 50 characters long"],
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
    },
    emailId: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value))
                throw new Error("Password is not strong enough");
        }
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    profileImage: {
        type: String,
        default: ""
    }

}, {
    timestamps: true,
});

UserSchema.methods.validatePassword = async function (passwordInputByUser) {
    return await bcrypt.compare(passwordInputByUser, this.password);    
}

UserSchema.methods.getJWT = async function () {
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '15d'}); 
}


module.exports = mongoose.model("User", UserSchema);