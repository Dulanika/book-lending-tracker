const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

class AuthService {
  async register(name, email, password) {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await UserRepository.createUser({ name, email, passwordHash });

    return this.generateToken(newUser);
  }

  async login(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return this.generateToken(user);
  }

  generateToken(user) {
    const payload = { userId: user._id, name: user.name };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  } 
}

module.exports = new AuthService();
