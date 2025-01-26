const UserModel = require('../models/userModel'); // Import UserModel
const { generateToken } = require('../middleware/auth.js');

module.exports.register = async (req, res, next) => {
    try {
      const { firstName, lastName, phoneNum, email, password } = req.body;
  
      // Check if the user already exists by email
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Set default role as 'user' if not provided
      const role = 'user';  // Default role is 'user'
  
      // Create new user data with role
      const userData = { firstName, lastName, phoneNum, email, password, role };
  
      // Create new user
      const newUser = await UserModel.create(userData); // Use create method from UserModel
  
      // Generate JWT token
      const token = generateToken(newUser);
  
      // Send the response with the token and user info
      res.status(201).json({ token, user: newUser });
  
    } catch (error) {
      next(error);
    }
  };
  
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the password
    const isPasswordValid = await UserModel.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Send the response with the token and user info
    res.json({ token, user });

  } catch (error) {
    next(error);
  }
};
