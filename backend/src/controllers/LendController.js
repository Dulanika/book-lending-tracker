const LendService = require('../services/LendService');

class LendController {
  async lendBook(req, res) {
    try {
      const { bookId, borrowerName, lendDate, expectedReturnDate } = req.body;
      const record = await LendService.lendBook(
        req.user._id.toString(),
        bookId,
        borrowerName,
        lendDate,
        expectedReturnDate
      );
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async returnBook(req, res) {
    try {
      const { bookId } = req.body;
      const record = await LendService.returnBook(req.user._id.toString(), bookId);
      res.json({ message: 'Book marked as returned', record });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async lendHistory(req, res) {
    try {
      const history = await LendService.getLendHistory(req.user._id.toString());
      res.json(history);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new LendController();
