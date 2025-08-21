import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

async function getRegisterController(req, res) {
  console.log("Register Page rendering!");

  return res.render("register");
}
async function postRegisterController(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.json({
        message: "Missing Credentials!!",
      });
    }

    const userExists = await userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (userExists) {
      return res.json({
        message: "User already Exists!!",
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user,
    });
  } catch (error) {
    console.log(error, error.message);

    return res.json({
      message: error.message,
    });
  }
}
async function getLoginController(req,res) {
  return res.render("login");
}

async function postLoginController(req,res) {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({
        message: "Missing Credentials",
      });
    }

    const user = await userModel.findOne({
        $or:[
            {email:identifier},
            {username:identifier}
        ]
    });
    if (!user) {
      return res.status(400).json({
        message: "User doesn't exists!",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ email:user.email }, process.env.JWT_SECRET);
    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
export { getRegisterController, postRegisterController ,getLoginController,postLoginController};
