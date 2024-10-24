const jwt = require("jsonwebtoken");
const User = require("../../databases/models/User");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { generateJwtToken } = require("../../utils/jwtHelper");
const logAction = require("../../utils/logger");
dotenv.config();

const signupController = async (req, res) => {
  let { username, password ,role} = req.body;

  console.log({ username, password });
  try {
    if (!username || !password) {
      return res.status(400).json({ error: "All input fields are required" });
    }

    const findUser = await User.findOne({ username });
    if (findUser) {
      return res.status(409).json({ error: "User already exists" });
    }

   

    password = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password,
      role
    });
    await logAction(user._id, user.role, 'Signup', { message: 'User Signed up' });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const authController = async (req, res) => {
  let { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ error: "All input fields are required" });
    }

    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(404).json({ error: "No user found" });
    }
    await logAction(findUser._id, findUser.role, 'login', { message: 'User logged in' });


    const isPasswordMatch = await bcrypt.compare(password, findUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateJwtToken(
      { username, id: findUser.id,role:findUser.role },
      "24h"
    );

    res.status(200).json({ user:findUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser= async (req, res) => {

  const { username, password, role } = req.body;
  try {
    const user = await User.findById(req.user.id);
    await logAction(user._id, user.role, 'Updated', { message: 'User Updated' });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (req.user.role === 'admin' && role) {
      user.role = role;
    }
    console.log(role)
    console.log(user.role)

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

const deleteUser=async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await logAction(user._id, user.role, 'Deleted', { message: 'User Deleted' });

    // Soft delete by setting 'deleted' field
    user.deleted = true;
    await user.save();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}
const getUserProfile=async(req,res)=>{
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the logged-in user is an admin
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ message: 'Access denied: Admins only' });
    // }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }

}

module.exports = { authController, signupController ,updateUser,deleteUser,getUserProfile};
