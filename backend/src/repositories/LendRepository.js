const LendRecord = require('../models/LendRecord');

class LendRepository {
  async createLendRecord(data) {
    const record = new LendRecord(data);
    return await record.save();
  }

async findLendsByUser(userId, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const [records, total] = await Promise.all([
    LendRecord.find({ userId })
      .populate('bookId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    LendRecord.countDocuments({ userId })
  ]);

  // Add isOverdue flag to each record
  const now = new Date();
  const recordsWithOverdue = records.map(record => ({
    ...record.toObject(),
    isOverdue:
      !record.returned &&
      record.expectedReturnDate &&
      new Date(record.expectedReturnDate) < now,
  }));

  return {
    records: recordsWithOverdue,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

  async findAllByUser(userId) {
  return await Book.find({ userId }).select('title author genre status actualReturnDate');
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
