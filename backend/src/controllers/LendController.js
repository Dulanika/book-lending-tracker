const LendService = require('../services/LendService');

class LendController {

  // LENDING BOOKS

  async lendBook(req, res) {
    try {
      console.log('Request Body:', req.body);
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
      console.error('LendBook Error:', error.message);
      res.status(400).json({ message: error.message });
    }
  }

  // RETURN BOOKS

  async returnBook(req, res) {
    try {
      const { bookId } = req.body;
      const record = await LendService.returnBook(req.user._id.toString(), bookId);
      res.json({ message: 'Book marked as returned', record });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // LEND HISTORY

  // 1. LEND HISTORY RECORDS SETUP IN TABLE WITH PAGINATION 

  async getLendHistory(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const result = await LendService.getLendHistory(req.user._id, page);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// 2. LEND HISTORY RECORDS SETUP IN TABLE

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
