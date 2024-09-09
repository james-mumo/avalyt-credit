// controllers/userController.js
import User from "../models/User.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    // const isMatch = await user.comparePassword(password);
    // if (!isMatch) {
    //   return res.status(401).json({ error: "Invalid email or password" });
    // }

    // Generate a token (optional, if you are using JWT or another authentication method)
    // const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      user: {
        IDNumber: user.IDNumber,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        // Add other user details as needed
      },
      // token, // Uncomment if you generate a token
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};

// Existing createUser function
export const createUser = async (req, res) => {
  try {
    const { IDNumber, email, dateOfBirth, password, ...rest } = req.body;

    // Validate required fields
    if (!IDNumber || !password) {
      return res
        .status(400)
        .json({ error: "IDNumber and password are required" });
    }

    // Check if user with the same IDNumber already exists
    const existingUserByIDNumber = await User.findOne({ IDNumber });
    if (existingUserByIDNumber) {
      return res
        .status(400)
        .json({ error: "User with this IDNumber already exists" });
    }

    // Check if email is provided and if user with the same email already exists
    if (email) {
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }
    }

    // Create a new user
    const user = new User({
      ...rest,
      IDNumber,
      email,
      password, // Make sure to include password
      dateOfBirth: new Date(dateOfBirth),
    });

    console.log(req.body); // Log the data to verify its structure

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ error: error.message });
  }
};

// New function to get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ error: error.message });
  }
};
