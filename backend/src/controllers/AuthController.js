const AuthService = require('../services/AuthService');

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const token = await AuthService.register(name, email, password);
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
  console.log('Login route hit');
  try {
    const { email, password } = req.body;
    const { token, user } = await AuthService.login(email, password);

    res.json({
      token,
      userData: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
    console.log('Login successful:', token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
}

module.exports = new AuthController();
