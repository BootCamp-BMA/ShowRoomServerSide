const UserModel = require('../models/userModel'); // Import UserModel

const {connectMongo} = require('../config/db')

// Update User Profile
module.exports.updateProfile = async (req, res, next) => {
    try {
      const { userId } = req.params;  // Get userId from request params
      const { firstName, lastName, phoneNum, email, password } = req.body;
  
      // Find the user by userId
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Prepare the update data, only update the fields that were provided
      const updateData = {};
  
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (phoneNum) updateData.phoneNum = phoneNum;
      if (email) updateData.email = email;  // Only update if new email is provided
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);  // Hash the new password
      }
  
      // If no fields to update, send a response indicating nothing changed
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update' });
      }
  
      // Update the user in the database
      const isUpdated = await UserModel.update(userId, updateData);
  
      if (!isUpdated) {
        return res.status(404).json({ message: 'User not found or nothing to update' });
      }
  
      // Return a success message
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      next(error); // Pass the error to the next middleware (error handler)
    }
  };
  
// Get Users based on conditions (getUsersWhere)
module.exports.getUsersWhere = async (req, res, next) => {
  try {
    const { condition = {}, limit = 10, skip = 0, sort = {} } = req.body;

    // Fetch users from the UserModel with the provided condition, limit, skip, and sort
    const db = await connectMongo();
    const collection = db.collection('users');

    const users = await collection
      .find(condition)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .toArray();

    // Return the fetched users
    res.status(200).json({ users });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};

// Delete a User (deleteUsers)
module.exports.deleteUsers = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log('userId:', userId); // Add logging to see the value of userId

    const isDeleted = await UserModel.delete(userId);

    if (!isDeleted) {
      return res.status(404).json({ message: 'User not found or unable to delete' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error during deletion:', error); // Log any error that occurs
    next(error);
  }
};

