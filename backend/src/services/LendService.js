const LendRepository = require('../repositories/LendRepository');
const BookRepository = require('../repositories/BookRepository');

class LendService {
  async lendBook(userId, bookId, borrowerName, lendDate, expectedReturnDate) {
    const book = await BookRepository.findById(bookId);
    if (!book || book.userId.toString() !== userId) {
      throw new Error('Book not found or unauthorized');
    }

    if (book.status === 'borrowed') {
      throw new Error('Book is already borrowed');
    }

    const lendRecord = await LendRepository.createLendRecord({
      userId, bookId, borrowerName, lendDate, expectedReturnDate
    });

    await BookRepository.updateBook(bookId, { status: 'borrowed' });

    return lendRecord;
  }

  async returnBook(userId, bookId) {
    const book = await BookRepository.findById(bookId);
    if (!book || book.userId.toString() !== userId) {
      throw new Error('Book not found or unauthorized');
    }

    const lendRecord = await LendRepository.findActiveLendByBook(bookId);
    if (!lendRecord) {
      throw new Error('This book is not currently borrowed');
    }

    await LendRepository.markReturned(lendRecord._id);
    await BookRepository.updateBook(bookId, { status: 'available' });

    return lendRecord;
  }

  async getLendHistory(userId) {
    return await LendRepository.findLendsByUser(userId);
  }
}

module.exports = new LendService();
