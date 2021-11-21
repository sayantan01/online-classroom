const Isemail = require("isemail");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModels");

// function to detect empty input fields and invalid email
const validator = (fields, fieldnames) => {
  let err = null;
  for (let i = 0; i < fields.length; i++) {
    // if a field is empty
    if (!fields[i]) {
      err = `${fieldnames[i]} is required`;
      break;
    }

    // if the field is email, check whether it's a valid email or not
    if (fieldnames[i] === "email") {
      if (!Isemail.validate(fields[i])) {
        err = "Invalid email!";
        break;
      }
    }
  }
  return err;
};

// middleware to verify the jwt token extracted from bearer header
const authHandler = async (req, res, next) => {
  try {
    const decoded = await jwt.verify(req.token, process.env.SECRET);
    const email = decoded.email;
    const user = await userSchema.findOne({ email });
    if (!user) res.status(401).json({ msg: "User unauthorized" });
    else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(401).json({ msg: "User unauthorized" });
    next();
  }
};

module.exports = { validator, authHandler };
