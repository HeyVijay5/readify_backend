const express = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

/* User Registration */
router.post("/register", async (req, res) => {
  try {
    /* Salting and Hashing the Password */
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    /* Create a new user */
    const newuser = await new User({
      userType: req.body.userType,
      userFullName: req.body.userFullName,
      admissionId: req.body.admissionId,
      employeeId: req.body.employeeId,
      age: req.body.age,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      password: hashedPass,
      isAdmin: req.body.isAdmin,
    });

    /* Save User and Return */
    const user = await newuser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

/* User Login */
router.post("/signin", async (req, res) => {
  try {
    console.log(req.body, "req");
    
    const user = await User.findOne({
      $or: [
        { admissionId: req.body.admissionId },
        { employeeId: req.body.employeeId },
      ],
    });

    console.log(user, "user");

    if (!user) {
      return res.status(404).json("User not found");
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json("Wrong Password");
    }

    if (!user.isAdmin && req.body.isAdmin) {
      return res.status(403).json("Permission Denied");
    }

    res.status(200).json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});


module.exports = router;
