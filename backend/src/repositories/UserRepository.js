const User = require('../models/User');

// This repository handles all database operations related to users
class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findById(id) {
    return await User.findById(id);
  }
}

module.exports = new UserRepository();
