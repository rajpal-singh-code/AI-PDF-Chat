const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const { validateSignupData } = require("../utils/validation.js");
const authMiddleware = require("../middlewares/auth.js");
const checkRole = require("../middlewares/role.js");
const upload = require("../config/multer.js");

const cookieParser = require("cookie-parser");
authRouter.use(cookieParser());


authRouter.post("/signup", async(req,res) => {
    try{
        validateSignupData(req);
        const { firstName,lastName,emailId,password } = req.body;

        const passwordHash = await bcrypt.hash(password,10);
        const user = new User({
            firstName,lastName,emailId,password:passwordHash
        })
        
        const savedUser = await user.save();

        const token = await savedUser.getJWT();

        res.cookie("token",token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 8*60*60*1000
        });

        res.status(201).json({
            message: "User added successfully!",
            data: savedUser,
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) throw new Error("Invalid Credentials");

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) throw new Error("Invalid Credentials");

    const token = await user.getJWT(); 

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax", 
      maxAge: 15 * 24 * 60 * 60 * 1000 
    });

    res.status(200).json({
      user: {
        name: `Login Successful  ${user.firstName} `,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token, 
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


authRouter.post("/logout", (req,res) => {
    res.cookie("token","", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logout Successful "});
});


authRouter.get("/user", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});


authRouter.delete("/admin/delete", authMiddleware, checkRole("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});



authRouter.post("/upload", authMiddleware, upload.single("image"), async (req, res) => {
  req.user.profileImage = req.file.path;
  await req.user.save();

  res.json({
    message: "Image uploaded",
    path: req.file.path
  });
});


module.exports = authRouter
