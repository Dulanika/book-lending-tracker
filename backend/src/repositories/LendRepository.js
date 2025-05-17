const LendRecord = require('../models/LendRecord');

class LendRepository {
  async createLendRecord(data) {
    const record = new LendRecord(data);
    return await record.save();
  }

  async findLendsByUser(userId) {
    return await LendRecord.find({ userId }).populate('bookId');
  }

  async findActiveLendByBook(bookId) {
    return await LendRecord.findOne({ bookId, returned: false });
  }

  async markReturned(lendId, actualReturnDate = new Date()) {
    return await LendRecord.findByIdAndUpdate(
      lendId,
      { returned: true, actualReturnDate },
      { new: true }
    );
  }
}

module.exports = new LendRepository();
