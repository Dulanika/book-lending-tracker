const DashboardService = require('../services/DashboardService');

class DashboardController {
  async getStats(req, res) {
    try {
      const stats = await DashboardService.getDashboardStats(req.user._id.toString());
      res.json(stats);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new DashboardController();
