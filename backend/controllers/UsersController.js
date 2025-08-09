const { User } = require('../models');
const { generateToken } = require('../middleware/auth');

class UsersController {
  // Register new user
  static async register(req, res) {
    try {
      const { username, email, password, firstName, lastName, bio } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        where: {
          $or: [{ email }, { username }]
        }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'User with this email or username already exists' });
      }

      // Create new user
      const user = await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
        bio
      });

      // Generate token
      const token = generateToken(user.id);

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user.toJSON();

      res.status(201).json({
        message: 'User created successfully',
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ where: { email } });

      if (!user || !(await user.validatePassword(password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate token
      const token = generateToken(user.id);

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user.toJSON();

      res.json({
        message: 'Login successful',
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get user profile
  static async getProfile(req, res) {
    try {
      const { password: _, ...userWithoutPassword } = req.user.toJSON();
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update user profile
  static async updateProfile(req, res) {
    try {
      const { firstName, lastName, bio, profilePicture } = req.body;
      
      await req.user.update({
        firstName,
        lastName,
        bio,
        profilePicture
      });

      const { password: _, ...userWithoutPassword } = req.user.toJSON();
      res.json({
        message: 'Profile updated successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get all users (for finding friends)
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture', 'bio']
      });

      res.json({ users });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UsersController;
